-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2026 at 11:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tilevista`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_logs`
--

CREATE TABLE `admin_logs` (
  `log_id` char(36) NOT NULL,
  `admin_id` char(36) NOT NULL,
  `action_type` varchar(100) DEFAULT NULL,
  `action` text DEFAULT NULL,
  `target_type` varchar(100) DEFAULT NULL,
  `target_id` char(36) DEFAULT NULL,
  `old_value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`old_value`)),
  `new_value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`new_value`)),
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asset_sizes`
--

CREATE TABLE `asset_sizes` (
  `size_id` char(36) NOT NULL,
  `asset_id` char(36) NOT NULL,
  `width` decimal(10,2) DEFAULT NULL,
  `height` decimal(10,2) DEFAULT NULL,
  `depth` decimal(10,2) DEFAULT NULL,
  `unit` enum('cm','m') DEFAULT 'cm'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asset_transformations`
--

CREATE TABLE `asset_transformations` (
  `transform_id` char(36) NOT NULL,
  `asset_id` char(36) NOT NULL,
  `scale_x` decimal(10,2) DEFAULT 1.00,
  `scale_y` decimal(10,2) DEFAULT 1.00,
  `scale_z` decimal(10,2) DEFAULT 1.00,
  `rotation_x` decimal(10,2) DEFAULT 0.00,
  `rotation_y` decimal(10,2) DEFAULT 0.00,
  `rotation_z` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cart_id` char(36) NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `status` enum('active','abandoned','converted') DEFAULT 'active',
  `expires_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` char(36) NOT NULL,
  `cart_id` char(36) NOT NULL,
  `ospos_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unit_price_snapshot` decimal(12,2) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` char(36) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `design_elements`
--

CREATE TABLE `design_elements` (
  `element_id` char(36) NOT NULL,
  `design_id` char(36) NOT NULL,
  `element_type` varchar(100) DEFAULT NULL,
  `position_x` decimal(10,2) DEFAULT NULL,
  `position_y` decimal(10,2) DEFAULT NULL,
  `position_z` decimal(10,2) DEFAULT NULL,
  `width` decimal(10,2) DEFAULT NULL,
  `height` decimal(10,2) DEFAULT NULL,
  `depth` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `design_items`
--

CREATE TABLE `design_items` (
  `design_item_id` char(36) NOT NULL,
  `design_id` char(36) NOT NULL,
  `product_id` char(36) NOT NULL,
  `asset_id` char(36) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `position_x` decimal(10,2) DEFAULT NULL,
  `position_y` decimal(10,2) DEFAULT NULL,
  `position_z` decimal(10,2) DEFAULT NULL,
  `rotation_x` decimal(10,2) DEFAULT 0.00,
  `rotation_y` decimal(10,2) DEFAULT 0.00,
  `rotation_z` decimal(10,2) DEFAULT 0.00,
  `scale_x` decimal(10,2) DEFAULT 1.00,
  `scale_y` decimal(10,2) DEFAULT 1.00,
  `scale_z` decimal(10,2) DEFAULT 1.00,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `design_measurements`
--

CREATE TABLE `design_measurements` (
  `measurement_id` char(36) NOT NULL,
  `design_id` char(36) NOT NULL,
  `point_a_x` decimal(10,2) DEFAULT NULL,
  `point_a_y` decimal(10,2) DEFAULT NULL,
  `point_a_z` decimal(10,2) DEFAULT NULL,
  `point_b_x` decimal(10,2) DEFAULT NULL,
  `point_b_y` decimal(10,2) DEFAULT NULL,
  `point_b_z` decimal(10,2) DEFAULT NULL,
  `distance` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `design_openings`
--

CREATE TABLE `design_openings` (
  `opening_id` char(36) NOT NULL,
  `design_id` char(36) NOT NULL,
  `type` enum('door','window') DEFAULT NULL,
  `style` varchar(100) DEFAULT NULL,
  `width` decimal(10,2) DEFAULT NULL,
  `height` decimal(10,2) DEFAULT NULL,
  `wall_id` char(36) DEFAULT NULL,
  `position_x` decimal(10,2) DEFAULT NULL,
  `position_y` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `design_snapshots`
--

CREATE TABLE `design_snapshots` (
  `snapshot_id` char(36) NOT NULL,
  `design_id` char(36) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `design_walls`
--

CREATE TABLE `design_walls` (
  `wall_id` char(36) NOT NULL,
  `design_id` char(36) NOT NULL,
  `wall_label` varchar(50) DEFAULT NULL,
  `wall_sequence` int(11) DEFAULT NULL,
  `wall_length` decimal(10,2) DEFAULT NULL,
  `wall_height` decimal(10,2) DEFAULT NULL,
  `wall_color` varchar(50) DEFAULT NULL,
  `tile_asset_id` char(36) DEFAULT NULL,
  `tile_coverage_height` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_reservations`
--

CREATE TABLE `inventory_reservations` (
  `reservation_id` char(36) NOT NULL,
  `order_id` char(36) NOT NULL,
  `ospos_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  `status` enum('active','expired','completed') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` char(36) NOT NULL,
  `order_reference` varchar(100) NOT NULL,
  `user_id` char(36) NOT NULL,
  `design_id` char(36) DEFAULT NULL,
  `total_amount` decimal(12,2) NOT NULL,
  `status` enum('pending','approved','rejected','completed','cancelled') DEFAULT 'pending',
  `approval_type` enum('auto','manual') DEFAULT 'auto',
  `payment_status` enum('pending','paid') DEFAULT 'pending',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `confirmed_at` datetime DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` char(36) NOT NULL,
  `order_id` char(36) NOT NULL,
  `ospos_item_id` int(11) NOT NULL,
  `product_name_snapshot` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(12,2) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_status_history`
--

CREATE TABLE `order_status_history` (
  `history_id` char(36) NOT NULL,
  `order_id` char(36) NOT NULL,
  `status` varchar(50) NOT NULL,
  `changed_by` char(36) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `changed_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `package_id` char(36) NOT NULL,
  `package_name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `cover_image` varchar(500) DEFAULT NULL,
  `discount_percentage` decimal(5,2) DEFAULT 0.00,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `package_items`
--

CREATE TABLE `package_items` (
  `package_id` char(36) NOT NULL,
  `product_id` char(36) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` char(36) NOT NULL,
  `ospos_item_id` int(11) NOT NULL,
  `category_id` char(36) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_assets`
--

CREATE TABLE `product_assets` (
  `asset_id` char(36) NOT NULL,
  `product_id` char(36) NOT NULL,
  `thumbnail_url` varchar(500) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `glb_url` varchar(500) DEFAULT NULL,
  `material_type` varchar(100) DEFAULT NULL,
  `color_family` varchar(100) DEFAULT NULL,
  `is_visible` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_asset_tags`
--

CREATE TABLE `product_asset_tags` (
  `asset_id` char(36) NOT NULL,
  `tag_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `room_designs`
--

CREATE TABLE `room_designs` (
  `design_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `design_name` varchar(150) NOT NULL,
  `design_type` enum('room','bathroom') DEFAULT 'bathroom',
  `room_shape` varchar(50) DEFAULT NULL,
  `length` decimal(10,2) DEFAULT NULL,
  `width` decimal(10,2) DEFAULT NULL,
  `height` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `room_vertices`
--

CREATE TABLE `room_vertices` (
  `vertex_id` char(36) NOT NULL,
  `design_id` char(36) NOT NULL,
  `x` decimal(10,2) DEFAULT NULL,
  `y` decimal(10,2) DEFAULT NULL,
  `z` decimal(10,2) DEFAULT NULL,
  `sequence_order` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_thresholds`
--

CREATE TABLE `stock_thresholds` (
  `threshold_id` char(36) NOT NULL,
  `product_id` char(36) NOT NULL,
  `threshold_value` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `tag_id` char(36) NOT NULL,
  `tag_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` char(36) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('customer','admin') NOT NULL DEFAULT 'customer',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_addresses`
--

CREATE TABLE `user_addresses` (
  `address_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `label` enum('home','office','other') DEFAULT 'home',
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_logs`
--
ALTER TABLE `admin_logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `fk_admin_log_user` (`admin_id`);

--
-- Indexes for table `asset_sizes`
--
ALTER TABLE `asset_sizes`
  ADD PRIMARY KEY (`size_id`),
  ADD UNIQUE KEY `asset_id` (`asset_id`);

--
-- Indexes for table `asset_transformations`
--
ALTER TABLE `asset_transformations`
  ADD PRIMARY KEY (`transform_id`),
  ADD UNIQUE KEY `asset_id` (`asset_id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD UNIQUE KEY `session_id` (`session_id`),
  ADD KEY `fk_cart_user` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD KEY `fk_cart_item_cart` (`cart_id`),
  ADD KEY `idx_cart_items_ospos` (`ospos_item_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `design_elements`
--
ALTER TABLE `design_elements`
  ADD PRIMARY KEY (`element_id`),
  ADD KEY `fk_element_design` (`design_id`);

--
-- Indexes for table `design_items`
--
ALTER TABLE `design_items`
  ADD PRIMARY KEY (`design_item_id`),
  ADD KEY `fk_design_item_design` (`design_id`),
  ADD KEY `fk_design_item_product` (`product_id`),
  ADD KEY `fk_design_item_asset` (`asset_id`);

--
-- Indexes for table `design_measurements`
--
ALTER TABLE `design_measurements`
  ADD PRIMARY KEY (`measurement_id`),
  ADD KEY `fk_measurement_design` (`design_id`);

--
-- Indexes for table `design_openings`
--
ALTER TABLE `design_openings`
  ADD PRIMARY KEY (`opening_id`),
  ADD KEY `fk_opening_design` (`design_id`),
  ADD KEY `fk_opening_wall` (`wall_id`);

--
-- Indexes for table `design_snapshots`
--
ALTER TABLE `design_snapshots`
  ADD PRIMARY KEY (`snapshot_id`),
  ADD KEY `fk_snapshot_design` (`design_id`);

--
-- Indexes for table `design_walls`
--
ALTER TABLE `design_walls`
  ADD PRIMARY KEY (`wall_id`),
  ADD KEY `fk_wall_design` (`design_id`),
  ADD KEY `fk_wall_asset` (`tile_asset_id`);

--
-- Indexes for table `inventory_reservations`
--
ALTER TABLE `inventory_reservations`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `fk_reservation_order` (`order_id`),
  ADD KEY `idx_reservations_ospos` (`ospos_item_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `idx_notifications_user` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `order_reference` (`order_reference`),
  ADD KEY `fk_order_design` (`design_id`),
  ADD KEY `idx_orders_user` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `fk_order_item_order` (`order_id`),
  ADD KEY `idx_order_items_ospos` (`ospos_item_id`);

--
-- Indexes for table `order_status_history`
--
ALTER TABLE `order_status_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `fk_history_order` (`order_id`),
  ADD KEY `fk_history_user` (`changed_by`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`package_id`);

--
-- Indexes for table `package_items`
--
ALTER TABLE `package_items`
  ADD PRIMARY KEY (`package_id`,`product_id`),
  ADD KEY `fk_package_item_product` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `ospos_item_id` (`ospos_item_id`),
  ADD KEY `fk_product_category` (`category_id`),
  ADD KEY `idx_products_ospos` (`ospos_item_id`);

--
-- Indexes for table `product_assets`
--
ALTER TABLE `product_assets`
  ADD PRIMARY KEY (`asset_id`),
  ADD UNIQUE KEY `product_id` (`product_id`);

--
-- Indexes for table `product_asset_tags`
--
ALTER TABLE `product_asset_tags`
  ADD PRIMARY KEY (`asset_id`,`tag_id`),
  ADD KEY `fk_asset_tag_tag` (`tag_id`);

--
-- Indexes for table `room_designs`
--
ALTER TABLE `room_designs`
  ADD PRIMARY KEY (`design_id`),
  ADD KEY `idx_design_user` (`user_id`);

--
-- Indexes for table `room_vertices`
--
ALTER TABLE `room_vertices`
  ADD PRIMARY KEY (`vertex_id`),
  ADD KEY `fk_vertex_design` (`design_id`);

--
-- Indexes for table `stock_thresholds`
--
ALTER TABLE `stock_thresholds`
  ADD PRIMARY KEY (`threshold_id`),
  ADD UNIQUE KEY `product_id` (`product_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`),
  ADD UNIQUE KEY `tag_name` (`tag_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `fk_address_user` (`user_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_logs`
--
ALTER TABLE `admin_logs`
  ADD CONSTRAINT `fk_admin_log_user` FOREIGN KEY (`admin_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `asset_sizes`
--
ALTER TABLE `asset_sizes`
  ADD CONSTRAINT `fk_size_asset` FOREIGN KEY (`asset_id`) REFERENCES `product_assets` (`asset_id`) ON DELETE CASCADE;

--
-- Constraints for table `asset_transformations`
--
ALTER TABLE `asset_transformations`
  ADD CONSTRAINT `fk_transform_asset` FOREIGN KEY (`asset_id`) REFERENCES `product_assets` (`asset_id`) ON DELETE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `fk_cart_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `fk_cart_item_cart` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`) ON DELETE CASCADE;

--
-- Constraints for table `design_elements`
--
ALTER TABLE `design_elements`
  ADD CONSTRAINT `fk_element_design` FOREIGN KEY (`design_id`) REFERENCES `room_designs` (`design_id`) ON DELETE CASCADE;

--
-- Constraints for table `design_items`
--
ALTER TABLE `design_items`
  ADD CONSTRAINT `fk_design_item_asset` FOREIGN KEY (`asset_id`) REFERENCES `product_assets` (`asset_id`),
  ADD CONSTRAINT `fk_design_item_design` FOREIGN KEY (`design_id`) REFERENCES `room_designs` (`design_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_design_item_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `design_measurements`
--
ALTER TABLE `design_measurements`
  ADD CONSTRAINT `fk_measurement_design` FOREIGN KEY (`design_id`) REFERENCES `room_designs` (`design_id`) ON DELETE CASCADE;

--
-- Constraints for table `design_openings`
--
ALTER TABLE `design_openings`
  ADD CONSTRAINT `fk_opening_design` FOREIGN KEY (`design_id`) REFERENCES `room_designs` (`design_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_opening_wall` FOREIGN KEY (`wall_id`) REFERENCES `design_walls` (`wall_id`) ON DELETE SET NULL;

--
-- Constraints for table `design_snapshots`
--
ALTER TABLE `design_snapshots`
  ADD CONSTRAINT `fk_snapshot_design` FOREIGN KEY (`design_id`) REFERENCES `room_designs` (`design_id`) ON DELETE CASCADE;

--
-- Constraints for table `design_walls`
--
ALTER TABLE `design_walls`
  ADD CONSTRAINT `fk_wall_asset` FOREIGN KEY (`tile_asset_id`) REFERENCES `product_assets` (`asset_id`),
  ADD CONSTRAINT `fk_wall_design` FOREIGN KEY (`design_id`) REFERENCES `room_designs` (`design_id`) ON DELETE CASCADE;

--
-- Constraints for table `inventory_reservations`
--
ALTER TABLE `inventory_reservations`
  ADD CONSTRAINT `fk_reservation_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notification_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_order_design` FOREIGN KEY (`design_id`) REFERENCES `room_designs` (`design_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_order_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_item_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_status_history`
--
ALTER TABLE `order_status_history`
  ADD CONSTRAINT `fk_history_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_history_user` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;

--
-- Constraints for table `package_items`
--
ALTER TABLE `package_items`
  ADD CONSTRAINT `fk_package_item_package` FOREIGN KEY (`package_id`) REFERENCES `packages` (`package_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_package_item_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Constraints for table `product_assets`
--
ALTER TABLE `product_assets`
  ADD CONSTRAINT `fk_asset_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_asset_tags`
--
ALTER TABLE `product_asset_tags`
  ADD CONSTRAINT `fk_asset_tag_asset` FOREIGN KEY (`asset_id`) REFERENCES `product_assets` (`asset_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_asset_tag_tag` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE;

--
-- Constraints for table `room_designs`
--
ALTER TABLE `room_designs`
  ADD CONSTRAINT `fk_design_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `room_vertices`
--
ALTER TABLE `room_vertices`
  ADD CONSTRAINT `fk_vertex_design` FOREIGN KEY (`design_id`) REFERENCES `room_designs` (`design_id`) ON DELETE CASCADE;

--
-- Constraints for table `stock_thresholds`
--
ALTER TABLE `stock_thresholds`
  ADD CONSTRAINT `fk_threshold_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD CONSTRAINT `fk_address_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
