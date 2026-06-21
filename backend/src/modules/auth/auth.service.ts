import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { users_role, users_status } from '@prisma/client';
import { randomUUID } from 'crypto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (user) {
      let isMatch = false;
      try {
        isMatch = await bcrypt.compare(pass, user.password_hash);
      } catch (err) {
        isMatch = false;
      }
      if (!isMatch) {
        // Fallback for development database seed raw passwords
        isMatch = pass === user.password_hash;
      }
      if (isMatch) {
        const { password_hash, ...result } = user;
        return {
          id: user.user_id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          phone: user.phone ?? null,
          role: user.role.toUpperCase(), // Normalize role to uppercase ('CUSTOMER' / 'ADMIN')
          status: user.status ?? 'ACTIVE',
        };
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        status: user.status,
      },
    };
  }

  async register(dto: RegisterDto) {
    const { email, password, pass, firstName, first_name, lastName, last_name, phone, role, status } = dto;
    
    const resolvedPassword = password || pass;
    if (!resolvedPassword) {
      throw new BadRequestException('Password is required');
    }

    const emailLower = email.toLowerCase();
    const exists = await this.prisma.users.findUnique({
      where: { email: emailLower },
    });
    if (exists) {
      throw new BadRequestException('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(resolvedPassword, 10);
    const resolvedFirstName = firstName || first_name || '';
    const resolvedLastName = lastName || last_name || '';

    let resolvedRole: users_role = users_role.customer;
    if (role) {
      const lowerRole = role.toLowerCase();
      if (lowerRole === 'admin' || lowerRole === 'administrator') {
        resolvedRole = users_role.admin;
      }
    }

    let resolvedStatus: users_status = users_status.active;
    if (status) {
      const lowerStatus = status.toLowerCase();
      if (lowerStatus === 'inactive') {
        resolvedStatus = users_status.inactive;
      }
    }

    const user = await this.prisma.users.create({
      data: {
        user_id: randomUUID(),
        email: emailLower,
        password_hash: hashedPassword,
        first_name: resolvedFirstName,
        last_name: resolvedLastName,
        phone: phone || null,
        role: resolvedRole,
        status: resolvedStatus,
      },
    });

    const result = {
      id: user.user_id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role.toUpperCase(),
    };
    return this.login(result);
  }
}

