-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2026 at 10:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ospos`
--

-- --------------------------------------------------------

--
-- Table structure for table `ospos_app_config`
--

CREATE TABLE `ospos_app_config` (
  `key` varchar(50) NOT NULL,
  `value` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_app_config`
--

INSERT INTO `ospos_app_config` (`key`, `value`) VALUES
('account_number', ''),
('address', 'Pannagamuwa, Weerawila 82632'),
('allow_duplicate_barcodes', '0'),
('barcode_content', 'id'),
('barcode_first_row', 'category'),
('barcode_font', 'Arial'),
('barcode_font_size', '10'),
('barcode_formats', '[]'),
('barcode_generate_if_empty', '0'),
('barcode_height', '50'),
('barcode_num_in_row', '2'),
('barcode_page_cellspacing', '20'),
('barcode_page_width', '100'),
('barcode_second_row', 'item_code'),
('barcode_third_row', 'unit_price'),
('barcode_type', 'C39'),
('barcode_width', '250'),
('cash_decimals', '2'),
('cash_rounding_code', '0'),
('category_dropdown', ''),
('company', 'Alahapperuma Trade Center'),
('company_logo', 'Logo (2).jpg'),
('country_codes', 'lk'),
('currency_code', 'LKR'),
('currency_decimals', '2'),
('currency_symbol', 'Rs.'),
('custom1_name', 'Brand'),
('customer_reward_enable', '0'),
('dateformat', 'm/d/Y'),
('date_or_time_format', ''),
('default_receivings_discount', '0'),
('default_receivings_discount_type', '0'),
('default_register_mode', 'sale'),
('default_sales_discount', '0'),
('default_sales_discount_type', '0'),
('default_tax_1_name', ''),
('default_tax_1_rate', ''),
('default_tax_2_name', ''),
('default_tax_2_rate', ''),
('default_tax_category', 'Standard'),
('default_tax_code', ''),
('default_tax_jurisdiction', ''),
('default_tax_rate', '8'),
('derive_sale_quantity', '0'),
('dinner_table_enable', '0'),
('email', 'alahapperumatrade@gmail.com'),
('email_receipt_check_behaviour', 'last'),
('enforce_privacy', '0'),
('fax', ''),
('financial_year', '1'),
('gcaptcha_enable', '0'),
('gcaptcha_secret_key', ''),
('gcaptcha_site_key', ''),
('giftcard_number', 'series'),
('image_allowed_types', 'gif,jpg,png'),
('image_max_height', '480'),
('image_max_size', '128'),
('image_max_width', '640'),
('include_hsn', '0'),
('invoice_default_comments', 'This is a default comment'),
('invoice_email_message', 'Dear {CU}, In attachment the receipt for sale {ISEQ}'),
('invoice_enable', '1'),
('invoice_type', 'invoice'),
('language', 'english'),
('language_code', 'en'),
('last_used_invoice_number', '2'),
('last_used_quote_number', '0'),
('last_used_work_order_number', '0'),
('lines_per_page', '25'),
('line_sequence', '0'),
('login_form', ''),
('mailpath', '/usr/sbin/sendmail'),
('msg_msg', ''),
('msg_pwd', ''),
('msg_src', ''),
('msg_uid', ''),
('multi_pack_enabled', '0'),
('notify_horizontal_position', 'center'),
('notify_vertical_position', 'bottom'),
('number_locale', 'en_LK'),
('payment_message', ''),
('payment_options_order', 'cashdebitcredit'),
('phone', '+94 77 083 43 61'),
('print_bottom_margin', '0'),
('print_delay_autoreturn', '0'),
('print_footer', '0'),
('print_header', '0'),
('print_left_margin', '0'),
('print_receipt_check_behaviour', 'last'),
('print_right_margin', '0'),
('print_silently', '1'),
('print_top_margin', '0'),
('protocol', 'mail'),
('quantity_decimals', '0'),
('quote_default_comments', 'This is a default quote comment'),
('receipt_font_size', '12'),
('receipt_show_company_name', '1'),
('receipt_show_description', '1'),
('receipt_show_serialnumber', '1'),
('receipt_show_taxes', '0'),
('receipt_show_tax_ind', '0'),
('receipt_show_total_discount', '1'),
('receipt_template', 'receipt_default'),
('receiving_calculate_average_price', ''),
('recv_invoice_format', '{CO}'),
('return_policy', 'Thank you for your business!\r\nReturn & Exchange Policy:\r\n1. Returns/Exchanges accepted within 30 days of purchase with original receipt.\r\n2. Items must be unused, undamaged, and in their original packaging.\r\n3. For tiles, only full, unopened boxes will be accepted for return.\r\n4. Delivery/transportation charges are non-refundable.'),
('sales_invoice_format', '{CO}'),
('sales_quote_format', 'Q%y{QSEQ:6}'),
('smtp_crypto', 'ssl'),
('smtp_host', ''),
('smtp_pass', ''),
('smtp_port', '465'),
('smtp_timeout', '5'),
('smtp_user', ''),
('statistics', '1'),
('suggestions_first_column', 'name'),
('suggestions_second_column', ''),
('suggestions_third_column', ''),
('tax_decimals', '2'),
('tax_id', ''),
('tax_included', '0'),
('theme', 'flatly'),
('thousands_separator', '1'),
('timeformat', 'H:i:s'),
('timezone', 'Asia/Colombo'),
('use_destination_based_tax', '0'),
('website', ''),
('work_order_enable', '0'),
('work_order_format', 'W%y{WSEQ:6}');

-- --------------------------------------------------------

--
-- Table structure for table `ospos_attribute_definitions`
--

CREATE TABLE `ospos_attribute_definitions` (
  `definition_id` int(10) NOT NULL,
  `definition_name` varchar(255) NOT NULL,
  `definition_type` varchar(45) NOT NULL,
  `definition_unit` varchar(16) DEFAULT NULL,
  `definition_flags` tinyint(1) NOT NULL,
  `definition_fk` int(10) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_attribute_definitions`
--

INSERT INTO `ospos_attribute_definitions` (`definition_id`, `definition_name`, `definition_type`, `definition_unit`, `definition_flags`, `definition_fk`, `deleted`) VALUES
(1, 'Brand', 'TEXT', NULL, 1, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_attribute_links`
--

CREATE TABLE `ospos_attribute_links` (
  `attribute_id` int(11) DEFAULT NULL,
  `definition_id` int(11) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `sale_id` int(11) DEFAULT NULL,
  `receiving_id` int(11) DEFAULT NULL,
  `generated_unique_column` varchar(255) GENERATED ALWAYS AS (case when `sale_id` is null and `receiving_id` is null and `item_id` is not null then concat(`definition_id`,'-',`item_id`) else NULL end) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_attribute_links`
--

INSERT INTO `ospos_attribute_links` (`attribute_id`, `definition_id`, `item_id`, `sale_id`, `receiving_id`) VALUES
(1, 1, 1, NULL, NULL),
(1, 1, 3, NULL, NULL),
(1, 1, 5, NULL, NULL),
(1, 1, 8, NULL, NULL),
(1, 1, 9, NULL, NULL),
(1, 1, 12, NULL, NULL),
(1, 1, 15, NULL, NULL),
(2, 1, 2, NULL, NULL),
(2, 1, 2, 11, NULL),
(2, 1, 2, 15, NULL),
(2, 1, 4, NULL, NULL),
(2, 1, 13, NULL, NULL),
(3, 1, 6, NULL, NULL),
(3, 1, 7, NULL, NULL),
(3, 1, 11, NULL, NULL),
(3, 1, 16, NULL, NULL),
(4, 1, 10, NULL, NULL),
(4, 1, 10, 12, NULL),
(4, 1, 10, 13, NULL),
(4, 1, 10, 14, NULL),
(4, 1, 14, NULL, NULL),
(4, 1, 17, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_attribute_values`
--

CREATE TABLE `ospos_attribute_values` (
  `attribute_id` int(11) NOT NULL,
  `attribute_value` varchar(255) DEFAULT NULL,
  `attribute_date` date DEFAULT NULL,
  `attribute_decimal` decimal(7,3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_attribute_values`
--

INSERT INTO `ospos_attribute_values` (`attribute_id`, `attribute_value`, `attribute_date`, `attribute_decimal`) VALUES
(1, 'Rocell', NULL, NULL),
(2, 'Lanka Tiles', NULL, NULL),
(3, 'Grohe', NULL, NULL),
(4, 'Chartered', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_cash_up`
--

CREATE TABLE `ospos_cash_up` (
  `cashup_id` int(10) NOT NULL,
  `open_date` timestamp NULL DEFAULT current_timestamp(),
  `close_date` timestamp NULL DEFAULT NULL,
  `open_amount_cash` decimal(15,2) NOT NULL,
  `transfer_amount_cash` decimal(15,2) NOT NULL,
  `note` tinyint(4) NOT NULL DEFAULT 0,
  `closed_amount_cash` decimal(15,2) NOT NULL,
  `closed_amount_card` decimal(15,2) NOT NULL,
  `closed_amount_check` decimal(15,2) NOT NULL,
  `closed_amount_total` decimal(15,2) NOT NULL,
  `description` varchar(255) NOT NULL,
  `open_employee_id` int(10) NOT NULL,
  `close_employee_id` int(10) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `closed_amount_due` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_customers`
--

CREATE TABLE `ospos_customers` (
  `person_id` int(10) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `taxable` tinyint(1) NOT NULL DEFAULT 1,
  `tax_id` varchar(32) NOT NULL DEFAULT '',
  `sales_tax_code_id` int(11) DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `discount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `discount_type` tinyint(1) NOT NULL DEFAULT 0,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `employee_id` int(10) NOT NULL,
  `consent` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_customers`
--

INSERT INTO `ospos_customers` (`person_id`, `company_name`, `account_number`, `taxable`, `tax_id`, `sales_tax_code_id`, `package_id`, `points`, `deleted`, `discount`, `discount_type`, `date`, `employee_id`, `consent`) VALUES
(2, NULL, NULL, 0, '', NULL, NULL, NULL, 0, 0.00, 0, '2026-06-17 11:53:03', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_customers_packages`
--

CREATE TABLE `ospos_customers_packages` (
  `package_id` int(11) NOT NULL,
  `package_name` varchar(255) DEFAULT NULL,
  `points_percent` float NOT NULL DEFAULT 0,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_customers_packages`
--

INSERT INTO `ospos_customers_packages` (`package_id`, `package_name`, `points_percent`, `deleted`) VALUES
(1, 'Default', 0, 0),
(2, 'Bronze', 10, 0),
(3, 'Silver', 20, 0),
(4, 'Gold', 30, 0),
(5, 'Premium', 50, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_customers_points`
--

CREATE TABLE `ospos_customers_points` (
  `id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `sale_id` int(11) NOT NULL,
  `points_earned` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_dinner_tables`
--

CREATE TABLE `ospos_dinner_tables` (
  `dinner_table_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_employees`
--

CREATE TABLE `ospos_employees` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `person_id` int(10) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `hash_version` tinyint(1) NOT NULL DEFAULT 2,
  `language` varchar(48) DEFAULT NULL,
  `language_code` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_employees`
--

INSERT INTO `ospos_employees` (`username`, `password`, `person_id`, `deleted`, `hash_version`, `language`, `language_code`) VALUES
('admin', '$2y$10$vJBSMlD02EC7ENSrKfVQXuvq9tNRHMtcOA8MSK2NYS748HHWm.gcG', 1, 0, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_expenses`
--

CREATE TABLE `ospos_expenses` (
  `expense_id` int(10) NOT NULL,
  `date` timestamp NULL DEFAULT current_timestamp(),
  `amount` decimal(15,2) NOT NULL,
  `payment_type` varchar(40) NOT NULL,
  `expense_category_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `employee_id` int(10) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `supplier_tax_code` varchar(255) DEFAULT NULL,
  `tax_amount` decimal(15,2) DEFAULT NULL,
  `supplier_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_expense_categories`
--

CREATE TABLE `ospos_expense_categories` (
  `expense_category_id` int(10) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `category_description` varchar(255) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_giftcards`
--

CREATE TABLE `ospos_giftcards` (
  `record_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `giftcard_id` int(11) NOT NULL,
  `giftcard_number` varchar(255) DEFAULT NULL,
  `value` decimal(15,2) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `person_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_grants`
--

CREATE TABLE `ospos_grants` (
  `permission_id` varchar(255) NOT NULL,
  `person_id` int(10) NOT NULL,
  `menu_group` varchar(32) DEFAULT 'home'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_grants`
--

INSERT INTO `ospos_grants` (`permission_id`, `person_id`, `menu_group`) VALUES
('attributes', 1, 'office'),
('cashups', 1, 'home'),
('config', 1, 'office'),
('customers', 1, 'home'),
('employees', 1, 'office'),
('expenses', 1, 'home'),
('expenses_categories', 1, 'office'),
('giftcards', 1, 'home'),
('home', 1, 'office'),
('items', 1, 'home'),
('items_stock', 1, 'home'),
('item_kits', 1, 'home'),
('messages', 1, 'home'),
('office', 1, 'home'),
('receivings', 1, 'home'),
('receivings_stock', 1, 'home'),
('reports', 1, 'home'),
('reports_categories', 1, 'home'),
('reports_customers', 1, 'home'),
('reports_discounts', 1, 'home'),
('reports_employees', 1, 'home'),
('reports_expenses_categories', 1, 'home'),
('reports_inventory', 1, 'home'),
('reports_items', 1, 'home'),
('reports_payments', 1, 'home'),
('reports_receivings', 1, 'home'),
('reports_sales', 1, 'home'),
('reports_sales_taxes', 1, 'home'),
('reports_suppliers', 1, 'home'),
('reports_taxes', 1, 'home'),
('sales', 1, 'home'),
('sales_change_price', 1, '--'),
('sales_delete', 1, '--'),
('sales_stock', 1, 'home'),
('suppliers', 1, 'home');

-- --------------------------------------------------------

--
-- Table structure for table `ospos_inventory`
--

CREATE TABLE `ospos_inventory` (
  `trans_id` int(11) NOT NULL,
  `trans_items` int(11) NOT NULL DEFAULT 0,
  `trans_user` int(11) NOT NULL DEFAULT 0,
  `trans_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `trans_comment` text NOT NULL,
  `trans_location` int(11) NOT NULL,
  `trans_inventory` decimal(15,3) NOT NULL DEFAULT 0.000
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_inventory`
--

INSERT INTO `ospos_inventory` (`trans_id`, `trans_items`, `trans_user`, `trans_date`, `trans_comment`, `trans_location`, `trans_inventory`) VALUES
(1, 1, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 140.000),
(2, 1, 1, '2026-06-17 11:34:44', 'Sale sale_id: 1', 1, -60.000),
(3, 2, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 370.000),
(4, 2, 1, '2026-06-17 11:34:44', 'Sale sale_id: 3', 1, -120.000),
(5, 3, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 90.000),
(6, 3, 1, '2026-06-17 11:34:44', 'Sale sale_id: 7', 1, -30.000),
(7, 4, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 90.000),
(8, 4, 1, '2026-06-17 11:34:44', 'Sale sale_id: 1', 1, -40.000),
(9, 5, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 11.000),
(10, 5, 1, '2026-06-17 11:34:44', 'Sale sale_id: 9', 1, -8.000),
(11, 6, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 4.000),
(12, 6, 1, '2026-06-17 11:34:44', 'Sale sale_id: 2', 1, -1.000),
(13, 6, 1, '2026-06-17 11:34:44', 'Sale sale_id: 5', 1, -1.000),
(14, 7, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 24.000),
(15, 7, 1, '2026-06-17 11:34:44', 'Sale sale_id: 2', 1, -2.000),
(16, 7, 1, '2026-06-17 11:34:44', 'Sale sale_id: 6', 1, -2.000),
(17, 8, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 10.000),
(18, 9, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 2.000),
(19, 9, 1, '2026-06-17 11:34:44', 'Sale sale_id: 4', 1, -1.000),
(20, 10, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 26.000),
(21, 10, 1, '2026-06-17 11:34:44', 'Sale sale_id: 4', 1, -1.000),
(22, 11, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 5.000),
(23, 11, 1, '2026-06-17 11:34:44', 'Sale sale_id: 8', 1, -4.000),
(24, 12, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 1.000),
(25, 12, 1, '2026-06-17 11:34:44', 'Sale sale_id: 5', 1, -1.000),
(26, 13, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 450.000),
(27, 13, 1, '2026-06-17 11:34:44', 'Sale sale_id: 10', 1, -50.000),
(28, 14, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 128.000),
(29, 14, 1, '2026-06-17 11:34:44', 'Sale sale_id: 7', 1, -3.000),
(30, 14, 1, '2026-06-17 11:34:44', 'Sale sale_id: 10', 1, -5.000),
(31, 15, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 19.000),
(32, 15, 1, '2026-06-17 11:34:44', 'Sale sale_id: 8', 1, -4.000),
(33, 16, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 12.000),
(34, 17, 1, '2026-06-17 11:34:44', 'TileVista Initial Stock Import', 1, 20.000),
(35, 17, 1, '2026-06-17 11:34:44', 'Sale sale_id: 6', 1, -2.000),
(36, 10, 1, '2026-06-17 11:56:23', 'POS 13', 1, -1.000),
(37, 10, 1, '2026-06-17 12:00:42', 'POS 14', 1, -1.000),
(38, 2, 1, '2026-06-17 12:40:41', 'POS 15', 1, -15.000);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_items`
--

CREATE TABLE `ospos_items` (
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `item_number` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `cost_price` decimal(15,2) NOT NULL,
  `unit_price` decimal(15,2) NOT NULL,
  `reorder_level` decimal(15,3) NOT NULL DEFAULT 0.000,
  `receiving_quantity` decimal(15,3) NOT NULL DEFAULT 1.000,
  `item_id` int(10) NOT NULL,
  `pic_filename` varchar(255) DEFAULT NULL,
  `allow_alt_description` tinyint(1) NOT NULL,
  `is_serialized` tinyint(1) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `stock_type` tinyint(1) NOT NULL DEFAULT 0,
  `item_type` tinyint(1) NOT NULL DEFAULT 0,
  `tax_category_id` int(10) DEFAULT NULL,
  `qty_per_pack` decimal(15,3) NOT NULL DEFAULT 1.000,
  `pack_name` varchar(8) DEFAULT 'Each',
  `low_sell_item_id` int(10) DEFAULT 0,
  `hsn_code` varchar(32) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_items`
--

INSERT INTO `ospos_items` (`name`, `category`, `supplier_id`, `item_number`, `description`, `cost_price`, `unit_price`, `reorder_level`, `receiving_quantity`, `item_id`, `pic_filename`, `allow_alt_description`, `is_serialized`, `deleted`, `stock_type`, `item_type`, `tax_category_id`, `qty_per_pack`, `pack_name`, `low_sell_item_id`, `hsn_code`) VALUES
('Rocell Royal Onyx Ceramic Floor Tile (60x60)', 'Tiles', NULL, 'T-ONYX-60', 'Glossy finish royal onyx floor tile', 1850.00, 2450.00, 40.000, 1.000, 1, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Lanka Tiles Matte Grey Bathroom Tile (30x30)', 'Tiles', NULL, 'T-MGREY-30', 'Slip-resistant matte floor tile', 950.00, 1350.00, 50.000, 1.000, 2, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Rocell Pearl White Glossy Wall Tile (30x60)', 'Tiles', NULL, 'T-PWHITE-30', 'Classic glossy pearl white wall tile', 1250.00, 1750.00, 30.000, 1.000, 3, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Lanka Tiles Terrazzo Style Ceramic Tile (60x60)', 'Tiles', NULL, 'T-TERRA-60', 'Modern terrazzo style floor tile', 2100.00, 2900.00, 40.000, 1.000, 4, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Rocell Titanium Black Porcelain Slab (120x240)', 'Tiles', NULL, 'T-TIBLACK-120', 'High-end black large format porcelain slab', 12000.00, 18500.00, 15.000, 1.000, 5, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Grohe Tempesta Cosmopolitan Shower Kit', 'Bathware', NULL, 'B-TEMP-SHW', 'Luxury multi-function chrome shower head and rail', 38000.00, 55000.00, 10.000, 1.000, 6, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Grohe BauEdge Single-Lever Basin Mixer Faucet', 'Bathware', NULL, 'B-BAU-MIX', 'Sleek basin water-saving mixer tap', 18000.00, 26500.00, 12.000, 1.000, 7, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Rocell Water-Saving Wall Hung Bidet', 'Sanitaryware', NULL, 'S-WALL-BID', 'Wall-mounted premium bidet with soft close', 24000.00, 34500.00, 8.000, 1.000, 8, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Rocell Millennium Smart Luxury Commode', 'Sanitaryware', NULL, 'S-MIL-COM', 'Automatic flush smart commode with seat warmer', 85000.00, 125000.00, 5.000, 1.000, 9, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Chartered Ceramic Pedestal Wash Basin', 'Sanitaryware', NULL, 'S-PED-BAS', 'Standard standalone pedestal wash basin', 11000.00, 16500.00, 15.000, 1.000, 10, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Grohe Bau Ceramic Wall-Mounted WC', 'Sanitaryware', NULL, 'S-GRO-WC', 'Modern rimless wall-mounted commode', 42000.00, 62000.00, 6.000, 1.000, 11, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Rocell Acrylic Corner Freestanding Bathtub', 'Bathware', NULL, 'B-COR-BAT', 'Ergonomic corner freestanding bathtub', 95000.00, 140000.00, 4.000, 1.000, 12, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Lanka Tiles Mosaic Glass Border Tile', 'Tiles', NULL, 'T-MOS-BOR', 'Decorative border tile for feature walls', 450.00, 750.00, 100.000, 1.000, 13, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Chartered Chrome Towel Rail & Ring Set', 'Bathware', NULL, 'B-TOW-SET', 'Wall-mounted chrome bathroom accessory set', 4500.00, 7200.00, 20.000, 1.000, 14, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Rocell Concept-Series Semi-Recessed Basin', 'Sanitaryware', NULL, 'S-CON-BAS', 'Elegant vanity semi-recessed wash basin', 15000.00, 22000.00, 10.000, 1.000, 15, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Grohe Rainshower Mono Head Shower', 'Bathware', NULL, 'B-RAIN-SHW', 'Top-mount high pressure rainshower', 28000.00, 41000.00, 8.000, 1.000, 16, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, ''),
('Chartered Stainless Steel Kitchen Sink (Double)', 'Bathware', NULL, 'B-SS-SINK', 'Double bowl heavy duty kitchen sink', 16000.00, 23500.00, 10.000, 1.000, 17, NULL, 0, 0, 0, 0, 0, NULL, 1.000, 'Each', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `ospos_items_taxes`
--

CREATE TABLE `ospos_items_taxes` (
  `item_id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `percent` decimal(15,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_item_kits`
--

CREATE TABLE `ospos_item_kits` (
  `item_kit_id` int(11) NOT NULL,
  `item_kit_number` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `item_id` int(10) NOT NULL DEFAULT 0,
  `kit_discount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `kit_discount_type` tinyint(1) NOT NULL DEFAULT 0,
  `price_option` tinyint(1) NOT NULL DEFAULT 0,
  `print_option` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_item_kit_items`
--

CREATE TABLE `ospos_item_kit_items` (
  `item_kit_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` decimal(15,3) NOT NULL,
  `kit_sequence` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_item_quantities`
--

CREATE TABLE `ospos_item_quantities` (
  `item_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `quantity` decimal(15,3) NOT NULL DEFAULT 0.000
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_item_quantities`
--

INSERT INTO `ospos_item_quantities` (`item_id`, `location_id`, `quantity`) VALUES
(1, 1, 80.000),
(2, 1, 235.000),
(3, 1, 60.000),
(4, 1, 50.000),
(5, 1, 3.000),
(6, 1, 2.000),
(7, 1, 20.000),
(8, 1, 10.000),
(9, 1, 1.000),
(10, 1, 23.000),
(11, 1, 1.000),
(12, 1, 0.000),
(13, 1, 400.000),
(14, 1, 120.000),
(15, 1, 15.000),
(16, 1, 12.000),
(17, 1, 18.000);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_migrations`
--

CREATE TABLE `ospos_migrations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `version` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `group` varchar(255) NOT NULL,
  `namespace` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  `batch` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ospos_migrations`
--

INSERT INTO `ospos_migrations` (`id`, `version`, `class`, `group`, `namespace`, `time`, `batch`) VALUES
(1, '20170501150000', 'App\\Database\\Migrations\\Migration_Upgrade_To_3_1_1', 'default', 'App', 1781687982, 1),
(2, '20170502221506', 'App\\Database\\Migrations\\Migration_Sales_Tax_Data', 'default', 'App', 1781687982, 1),
(3, '20180225100000', 'App\\Database\\Migrations\\Migration_Upgrade_To_3_2_0', 'default', 'App', 1781687982, 1),
(4, '20180501100000', 'App\\Database\\Migrations\\Migration_Upgrade_To_3_2_1', 'default', 'App', 1781687982, 1),
(5, '20181015100000', 'App\\Database\\Migrations\\Migration_Attributes', 'default', 'App', 1781687982, 1),
(6, '20190111270000', 'App\\Database\\Migrations\\Migration_Upgrade_To_3_3_0', 'default', 'App', 1781687983, 1),
(7, '20190129212600', 'App\\Database\\Migrations\\Migration_IndiaGST', 'default', 'App', 1781687983, 1),
(8, '20190213210000', 'App\\Database\\Migrations\\Migration_IndiaGST1', 'default', 'App', 1781687983, 1),
(9, '20190220210000', 'App\\Database\\Migrations\\Migration_IndiaGST2', 'default', 'App', 1781687983, 1),
(10, '20190301124900', 'App\\Database\\Migrations\\Migration_decimal_attribute_type', 'default', 'App', 1781687983, 1),
(11, '20190317102600', 'App\\Database\\Migrations\\Migration_add_iso_4217', 'default', 'App', 1781687983, 1),
(12, '20190427100000', 'App\\Database\\Migrations\\Migration_PaymentTracking', 'default', 'App', 1781687983, 1),
(13, '20190502100000', 'App\\Database\\Migrations\\Migration_RefundTracking', 'default', 'App', 1781687983, 1),
(14, '20190612100000', 'App\\Database\\Migrations\\Migration_DBFix', 'default', 'App', 1781687984, 1),
(15, '20190615100000', 'App\\Database\\Migrations\\Migration_fix_attribute_datetime', 'default', 'App', 1781687984, 1),
(16, '20190712150200', 'App\\Database\\Migrations\\Migration_fix_empty_reports', 'default', 'App', 1781687984, 1),
(17, '20191008100000', 'App\\Database\\Migrations\\Migration_receipttaxindicator', 'default', 'App', 1781687984, 1),
(18, '20191231100000', 'App\\Database\\Migrations\\Migration_PaymentDateFix', 'default', 'App', 1781687984, 1),
(19, '20200125100000', 'App\\Database\\Migrations\\Migration_SalesChangePrice', 'default', 'App', 1781687984, 1),
(20, '20200202000000', 'App\\Database\\Migrations\\Migration_TaxAmount', 'default', 'App', 1781687984, 1),
(21, '20200215100000', 'App\\Database\\Migrations\\Migration_taxgroupconstraint', 'default', 'App', 1781687984, 1),
(22, '20200508000000', 'App\\Database\\Migrations\\Migration_image_upload_defaults', 'default', 'App', 1781687984, 1),
(23, '20200819000000', 'App\\Database\\Migrations\\Migration_modify_attr_links_constraint', 'default', 'App', 1781687984, 1),
(24, '20201108100000', 'App\\Database\\Migrations\\Migration_cashrounding', 'default', 'App', 1781687984, 1),
(25, '20201110000000', 'App\\Database\\Migrations\\Migration_add_item_kit_number', 'default', 'App', 1781687984, 1),
(26, '20210103000000', 'App\\Database\\Migrations\\Migration_modify_session_datatype', 'default', 'App', 1781687984, 1),
(27, '20210422000000', 'App\\Database\\Migrations\\Migration_database_optimizations', 'default', 'App', 1781687987, 1),
(28, '20210422000001', 'App\\Database\\Migrations\\Migration_remove_duplicate_links', 'default', 'App', 1781687987, 1),
(29, '20210714140000', 'App\\Database\\Migrations\\Migration_move_expenses_categories', 'default', 'App', 1781687987, 1),
(30, '20220127000000', 'App\\Database\\Migrations\\Convert_to_ci4', 'default', 'App', 1781687987, 1),
(31, '20230307000000', 'App\\Database\\Migrations\\IntToTinyint', 'default', 'App', 1781687987, 1),
(32, '20230412000000', 'App\\Database\\Migrations\\Migration_add_missing_config', 'default', 'App', 1781687987, 1),
(33, '20230412000001', 'App\\Database\\Migrations\\Migration_drop_account_number_index', 'default', 'App', 1781687987, 1),
(34, '20240319000000', 'App\\Database\\Migrations\\Migration_Convert_Barcode_Types', 'default', 'App', 1781687987, 1),
(35, '20240630000001', 'App\\Database\\Migrations\\Migration_fix_keys_for_db_upgrade', 'default', 'App', 1781687987, 1),
(36, '20240826000000', 'App\\Database\\Migrations\\fix_duplicate_attributes', 'default', 'App', 1781687987, 1),
(37, '20250213000000', 'App\\Database\\Migrations\\Migration_Attributes_fix_cascading_delete', 'default', 'App', 1781687987, 1),
(38, '20250425000000', 'App\\Database\\Migrations\\Migration_sessions_migration', 'default', 'App', 1781687987, 1),
(39, '20250519000000', 'App\\Database\\Migrations\\MigrationOptimizationIndices', 'default', 'App', 1781687988, 1),
(40, '20250522000000', 'App\\Database\\Migrations\\AttributeLinksUniqueConstraint', 'default', 'App', 1781687988, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_modules`
--

CREATE TABLE `ospos_modules` (
  `name_lang_key` varchar(255) NOT NULL,
  `desc_lang_key` varchar(255) NOT NULL,
  `sort` int(10) NOT NULL,
  `module_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_modules`
--

INSERT INTO `ospos_modules` (`name_lang_key`, `desc_lang_key`, `sort`, `module_id`) VALUES
('module_attributes', 'module_attributes_desc', 107, 'attributes'),
('module_cashups', 'module_cashups_desc', 110, 'cashups'),
('module_config', 'module_config_desc', 900, 'config'),
('module_customers', 'module_customers_desc', 10, 'customers'),
('module_employees', 'module_employees_desc', 80, 'employees'),
('module_expenses', 'module_expenses_desc', 108, 'expenses'),
('module_expenses_categories', 'module_expenses_categories_desc', 109, 'expenses_categories'),
('module_giftcards', 'module_giftcards_desc', 90, 'giftcards'),
('module_home', 'module_home_desc', 1, 'home'),
('module_items', 'module_items_desc', 20, 'items'),
('module_item_kits', 'module_item_kits_desc', 30, 'item_kits'),
('module_messages', 'module_messages_desc', 98, 'messages'),
('module_office', 'module_office_desc', 999, 'office'),
('module_receivings', 'module_receivings_desc', 60, 'receivings'),
('module_reports', 'module_reports_desc', 50, 'reports'),
('module_sales', 'module_sales_desc', 70, 'sales'),
('module_suppliers', 'module_suppliers_desc', 40, 'suppliers'),
('module_taxes', 'module_taxes_desc', 105, 'taxes');

-- --------------------------------------------------------

--
-- Table structure for table `ospos_people`
--

CREATE TABLE `ospos_people` (
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `gender` int(1) DEFAULT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address_1` varchar(255) NOT NULL,
  `address_2` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `comments` text NOT NULL,
  `person_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_people`
--

INSERT INTO `ospos_people` (`first_name`, `last_name`, `gender`, `phone_number`, `email`, `address_1`, `address_2`, `city`, `state`, `zip`, `country`, `comments`, `person_id`) VALUES
('John', 'Doe', NULL, '555-555-5555', 'changeme@example.com', 'Address 1', '', '', '', '', '', '', 1),
('Supun', 'Gunathilake', 1, '0774005021', 'supungunathilaka123@gmail.com', '\"SISILASA\" 45 Canal, Weragama, Weraganthota', '', 'Hasalaka', '', '20960', 'Sri Lanka', '', 2);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_permissions`
--

CREATE TABLE `ospos_permissions` (
  `permission_id` varchar(255) NOT NULL,
  `module_id` varchar(255) NOT NULL,
  `location_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_permissions`
--

INSERT INTO `ospos_permissions` (`permission_id`, `module_id`, `location_id`) VALUES
('attributes', 'attributes', NULL),
('cashups', 'cashups', NULL),
('config', 'config', NULL),
('customers', 'customers', NULL),
('employees', 'employees', NULL),
('expenses', 'expenses', NULL),
('expenses_categories', 'expenses_categories', NULL),
('giftcards', 'giftcards', NULL),
('home', 'home', NULL),
('items', 'items', NULL),
('items_stock', 'items', 1),
('item_kits', 'item_kits', NULL),
('messages', 'messages', NULL),
('office', 'office', NULL),
('receivings', 'receivings', NULL),
('receivings_stock', 'receivings', 1),
('reports', 'reports', NULL),
('reports_categories', 'reports', NULL),
('reports_customers', 'reports', NULL),
('reports_discounts', 'reports', NULL),
('reports_employees', 'reports', NULL),
('reports_expenses_categories', 'reports', NULL),
('reports_inventory', 'reports', NULL),
('reports_items', 'reports', NULL),
('reports_payments', 'reports', NULL),
('reports_receivings', 'reports', NULL),
('reports_sales', 'reports', NULL),
('reports_sales_taxes', 'reports', NULL),
('reports_suppliers', 'reports', NULL),
('reports_taxes', 'reports', NULL),
('sales', 'sales', NULL),
('sales_change_price', 'sales', NULL),
('sales_delete', 'sales', NULL),
('sales_stock', 'sales', 1),
('suppliers', 'suppliers', NULL),
('taxes', 'taxes', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_receivings`
--

CREATE TABLE `ospos_receivings` (
  `receiving_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `supplier_id` int(10) DEFAULT NULL,
  `employee_id` int(10) NOT NULL DEFAULT 0,
  `comment` text NOT NULL,
  `receiving_id` int(10) NOT NULL,
  `payment_type` varchar(20) DEFAULT NULL,
  `reference` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_receivings`
--

INSERT INTO `ospos_receivings` (`receiving_time`, `supplier_id`, `employee_id`, `comment`, `receiving_id`, `payment_type`, `reference`) VALUES
('2026-06-17 11:26:49', NULL, 1, '', 1, 'Cash', '');

-- --------------------------------------------------------

--
-- Table structure for table `ospos_receivings_items`
--

CREATE TABLE `ospos_receivings_items` (
  `receiving_id` int(10) NOT NULL DEFAULT 0,
  `item_id` int(10) NOT NULL DEFAULT 0,
  `description` varchar(30) DEFAULT NULL,
  `serialnumber` varchar(30) DEFAULT NULL,
  `line` int(3) NOT NULL,
  `quantity_purchased` decimal(15,3) NOT NULL DEFAULT 0.000,
  `item_cost_price` decimal(15,2) NOT NULL,
  `item_unit_price` decimal(15,2) NOT NULL,
  `discount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `discount_type` tinyint(1) NOT NULL DEFAULT 0,
  `item_location` int(11) NOT NULL,
  `receiving_quantity` decimal(15,3) NOT NULL DEFAULT 1.000
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_receivings_items`
--

INSERT INTO `ospos_receivings_items` (`receiving_id`, `item_id`, `description`, `serialnumber`, `line`, `quantity_purchased`, `item_cost_price`, `item_unit_price`, `discount`, `discount_type`, `item_location`, `receiving_quantity`) VALUES
(1, 1, '', '', 1, 1.000, 0.00, 0.00, 0.00, 0, 1, 1.000);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_sales`
--

CREATE TABLE `ospos_sales` (
  `sale_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `customer_id` int(10) DEFAULT NULL,
  `employee_id` int(10) NOT NULL DEFAULT 0,
  `comment` text NOT NULL,
  `invoice_number` varchar(32) DEFAULT NULL,
  `dinner_table_id` int(11) DEFAULT NULL,
  `sale_id` int(10) NOT NULL,
  `quote_number` varchar(32) DEFAULT NULL,
  `sale_status` tinyint(1) NOT NULL DEFAULT 0,
  `work_order_number` varchar(32) DEFAULT NULL,
  `sale_type` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_sales`
--

INSERT INTO `ospos_sales` (`sale_time`, `customer_id`, `employee_id`, `comment`, `invoice_number`, `dinner_table_id`, `sale_id`, `quote_number`, `sale_status`, `work_order_number`, `sale_type`) VALUES
('2026-04-20 05:00:00', NULL, 1, 'Bulk construction checkout - Galle Villa project', NULL, NULL, 1, NULL, 0, NULL, 0),
('2026-04-25 08:45:00', NULL, 1, 'Individual home builder fittings checkout', NULL, NULL, 2, NULL, 0, NULL, 0),
('2026-05-02 05:30:00', NULL, 1, 'Bulk order for luxury bathroom remodeling', NULL, NULL, 3, NULL, 0, NULL, 0),
('2026-05-10 11:15:00', NULL, 1, 'Sanitaryware upgrade checkout', NULL, NULL, 4, NULL, 0, NULL, 0),
('2026-05-18 03:50:00', NULL, 1, 'Luxury master bathroom suite upgrade', NULL, NULL, 5, NULL, 0, NULL, 0),
('2026-05-24 10:00:00', NULL, 1, 'Kitchen renovation accessories checkout', NULL, NULL, 6, NULL, 0, NULL, 0),
('2026-06-01 06:40:00', NULL, 1, 'Small bathroom wall tile renovation order', NULL, NULL, 7, NULL, 0, NULL, 0),
('2026-06-05 04:35:00', NULL, 1, 'Commercial office restroom fittings order', NULL, NULL, 8, NULL, 0, NULL, 0),
('2026-06-12 09:20:00', NULL, 1, 'Premium showroom porcelain slab purchase', NULL, NULL, 9, NULL, 0, NULL, 0),
('2026-06-16 06:00:00', NULL, 1, 'Bathware accessories & wall borders package', NULL, NULL, 10, NULL, 0, NULL, 0),
('2026-06-17 11:54:58', 2, 1, '', NULL, NULL, 11, NULL, 1, NULL, 0),
('2026-06-17 11:55:51', NULL, 1, '', NULL, NULL, 12, NULL, 1, NULL, 0),
('2026-06-17 11:56:23', NULL, 1, '', NULL, NULL, 13, NULL, 0, NULL, 0),
('2026-06-17 12:00:42', 2, 1, '', NULL, NULL, 14, NULL, 0, NULL, 0),
('2026-06-17 12:40:41', 2, 1, '', NULL, NULL, 15, NULL, 0, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_sales_items`
--

CREATE TABLE `ospos_sales_items` (
  `sale_id` int(10) NOT NULL DEFAULT 0,
  `item_id` int(10) NOT NULL DEFAULT 0,
  `description` varchar(255) DEFAULT NULL,
  `serialnumber` varchar(30) DEFAULT NULL,
  `line` int(3) NOT NULL DEFAULT 0,
  `quantity_purchased` decimal(15,3) NOT NULL DEFAULT 0.000,
  `item_cost_price` decimal(15,2) NOT NULL,
  `item_unit_price` decimal(15,2) NOT NULL,
  `discount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `discount_type` tinyint(1) NOT NULL DEFAULT 0,
  `item_location` int(11) NOT NULL,
  `print_option` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_sales_items`
--

INSERT INTO `ospos_sales_items` (`sale_id`, `item_id`, `description`, `serialnumber`, `line`, `quantity_purchased`, `item_cost_price`, `item_unit_price`, `discount`, `discount_type`, `item_location`, `print_option`) VALUES
(1, 1, NULL, NULL, 1, 60.000, 1850.00, 2450.00, 5.00, 0, 1, 0),
(1, 4, NULL, NULL, 2, 40.000, 2100.00, 2900.00, 5.00, 0, 1, 0),
(2, 6, NULL, NULL, 1, 1.000, 38000.00, 55000.00, 0.00, 0, 1, 0),
(2, 7, NULL, NULL, 2, 2.000, 18000.00, 26500.00, 0.00, 0, 1, 0),
(3, 2, NULL, NULL, 1, 120.000, 950.00, 1350.00, 10.00, 0, 1, 0),
(4, 9, NULL, NULL, 1, 1.000, 85000.00, 125000.00, 0.00, 0, 1, 0),
(4, 10, NULL, NULL, 2, 1.000, 11000.00, 16500.00, 0.00, 0, 1, 0),
(5, 6, NULL, NULL, 2, 1.000, 38000.00, 55000.00, 10.00, 0, 1, 0),
(5, 12, NULL, NULL, 1, 1.000, 95000.00, 140000.00, 10.00, 0, 1, 0),
(6, 7, NULL, NULL, 2, 2.000, 18000.00, 26500.00, 5.00, 0, 1, 0),
(6, 17, NULL, NULL, 1, 2.000, 16000.00, 23500.00, 5.00, 0, 1, 0),
(7, 3, NULL, NULL, 1, 30.000, 1250.00, 1750.00, 0.00, 0, 1, 0),
(7, 14, NULL, NULL, 2, 3.000, 4500.00, 7200.00, 0.00, 0, 1, 0),
(8, 11, NULL, NULL, 1, 4.000, 42000.00, 62000.00, 8.00, 0, 1, 0),
(8, 15, NULL, NULL, 2, 4.000, 15000.00, 22000.00, 8.00, 0, 1, 0),
(9, 5, NULL, NULL, 1, 8.000, 12000.00, 18500.00, 0.00, 0, 1, 0),
(10, 13, NULL, NULL, 2, 50.000, 450.00, 750.00, 15.00, 0, 1, 0),
(10, 14, NULL, NULL, 1, 5.000, 4500.00, 7200.00, 15.00, 0, 1, 0),
(11, 2, 'Slip-resistant matte floor tile', '', 1, 1.000, 950.00, 1350.00, 0.00, 0, 1, 0),
(12, 10, 'Standard standalone pedestal wash basin', '', 1, 1.000, 11000.00, 16500.00, 0.00, 0, 1, 0),
(13, 10, 'Standard standalone pedestal wash basin', '', 1, 1.000, 11000.00, 16500.00, 0.00, 0, 1, 0),
(14, 10, 'Standard standalone pedestal wash basin', '', 1, 1.000, 11000.00, 16500.00, 0.00, 0, 1, 0),
(15, 2, 'Slip-resistant matte floor tile', '', 1, 15.000, 950.00, 1350.00, 0.00, 0, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_sales_items_taxes`
--

CREATE TABLE `ospos_sales_items_taxes` (
  `sale_id` int(10) NOT NULL,
  `item_id` int(10) NOT NULL,
  `line` int(3) NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL,
  `percent` decimal(15,4) NOT NULL DEFAULT 0.0000,
  `tax_type` tinyint(1) NOT NULL DEFAULT 0,
  `rounding_code` tinyint(1) NOT NULL DEFAULT 0,
  `cascade_sequence` tinyint(1) NOT NULL DEFAULT 0,
  `item_tax_amount` decimal(15,4) NOT NULL DEFAULT 0.0000,
  `sales_tax_code_id` int(11) DEFAULT NULL,
  `jurisdiction_id` int(11) DEFAULT NULL,
  `tax_category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_sales_payments`
--

CREATE TABLE `ospos_sales_payments` (
  `payment_id` int(11) NOT NULL,
  `sale_id` int(10) NOT NULL,
  `payment_type` varchar(40) NOT NULL,
  `payment_amount` decimal(15,2) NOT NULL,
  `cash_refund` decimal(15,2) NOT NULL DEFAULT 0.00,
  `cash_adjustment` tinyint(4) NOT NULL DEFAULT 0,
  `employee_id` int(11) DEFAULT NULL,
  `payment_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `reference_code` varchar(40) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_sales_payments`
--

INSERT INTO `ospos_sales_payments` (`payment_id`, `sale_id`, `payment_type`, `payment_amount`, `cash_refund`, `cash_adjustment`, `employee_id`, `payment_time`, `reference_code`) VALUES
(1, 1, 'Cash', 249850.00, 0.00, 0, NULL, '2026-06-17 11:34:44', ''),
(2, 2, 'Debit Card', 108000.00, 0.00, 0, NULL, '2026-06-17 11:34:44', ''),
(3, 3, 'Bank Transfer', 145800.00, 0.00, 0, NULL, '2026-06-17 11:34:44', ''),
(4, 4, 'Cash', 141500.00, 0.00, 0, NULL, '2026-06-17 11:34:44', ''),
(5, 5, 'Credit Card', 175500.00, 0.00, 0, NULL, '2026-06-17 11:34:44', ''),
(6, 6, 'Debit Card', 95000.00, 0.00, 0, NULL, '2026-06-17 11:34:44', ''),
(7, 7, 'Cash', 74100.00, 0.00, 0, NULL, '2026-06-17 11:34:44', ''),
(8, 8, 'Bank Transfer', 309120.00, 0.00, 0, NULL, '2026-06-17 11:34:44', ''),
(9, 9, 'Credit Card', 148000.00, 0.00, 0, NULL, '2026-06-17 11:34:44', ''),
(10, 10, 'Cash', 62475.00, 0.00, 0, NULL, '2026-06-17 11:34:44', ''),
(11, 11, 'Cash', 2700.00, 0.00, 0, 1, '2026-06-17 11:54:58', ''),
(12, 12, 'Cash', 17000.00, 0.00, 0, 1, '2026-06-17 11:55:51', ''),
(13, 13, 'Cash', 16500.00, 0.00, 0, 1, '2026-06-17 11:56:23', ''),
(14, 14, 'Cash', 17000.00, 500.00, 0, 1, '2026-06-17 12:00:42', ''),
(15, 15, 'Cash', 20250.00, 0.00, 0, 1, '2026-06-17 12:40:41', '');

-- --------------------------------------------------------

--
-- Table structure for table `ospos_sales_reward_points`
--

CREATE TABLE `ospos_sales_reward_points` (
  `id` int(11) NOT NULL,
  `sale_id` int(11) NOT NULL,
  `earned` float NOT NULL,
  `used` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_sales_taxes`
--

CREATE TABLE `ospos_sales_taxes` (
  `sales_taxes_id` int(11) NOT NULL,
  `sale_id` int(10) NOT NULL,
  `jurisdiction_id` int(11) DEFAULT NULL,
  `tax_category_id` int(11) DEFAULT NULL,
  `tax_type` smallint(2) NOT NULL,
  `tax_group` varchar(32) NOT NULL,
  `sale_tax_basis` decimal(15,4) NOT NULL,
  `sale_tax_amount` decimal(15,4) NOT NULL,
  `print_sequence` tinyint(1) NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL,
  `tax_rate` decimal(15,4) NOT NULL,
  `sales_tax_code_id` int(11) DEFAULT NULL,
  `rounding_code` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_sessions`
--

CREATE TABLE `ospos_sessions` (
  `id` varchar(128) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `data` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ospos_sessions`
--

INSERT INTO `ospos_sessions` (`id`, `ip_address`, `timestamp`, `data`) VALUES
('ospos_session:07659a94619e77e746aaa157ce8b31f7', '::1', '2026-06-17 20:03:50', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738313732363534363b706572736f6e5f69647c733a313a2231223b6d656e755f67726f75707c733a343a22686f6d65223b5f63695f70726576696f75735f75726c7c733a32373a22687474703a2f2f6c6f63616c686f73743a383038302f6974656d73223b616c6c6f775f74656d705f6974656d737c693a303b6974656d5f6c6f636174696f6e7c733a313a2231223b),
('ospos_session:08dfd2ca898d06dde67450cfe33ffc9e', '::1', '2026-06-17 15:11:09', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738313730393033393b5f63695f70726576696f75735f75726c7c733a32373a22687474703a2f2f6c6f63616c686f73743a383038302f6c6f67696e223b),
('ospos_session:8dba88411edec509a127a1d15d4b8896', '::1', '2026-06-17 12:53:03', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738313730303733333b5f63695f70726576696f75735f75726c7c733a32363a22687474703a2f2f6c6f63616c686f73743a383038302f686f6d65223b706572736f6e5f69647c733a313a2231223b6d656e755f67726f75707c733a343a22686f6d65223b616c6c6f775f74656d705f6974656d737c693a313b6974656d5f6c6f636174696f6e7c733a313a2231223b73616c655f69647c693a2d313b73616c65735f6c6f636174696f6e7c693a313b726563765f73746f636b5f736f757263657c693a313b726563765f636172747c613a313a7b693a313b613a32303a7b733a373a226974656d5f6964223b733a323a223130223b733a31333a226974656d5f6c6f636174696f6e223b693a313b733a31313a226974656d5f6e756d626572223b733a393a22532d5045442d424153223b733a31303a2273746f636b5f6e616d65223b733a353a2273746f636b223b733a343a226c696e65223b693a313b733a343a226e616d65223b733a33373a2243686172746572656420436572616d696320506564657374616c205761736820426173696e223b733a31313a226465736372697074696f6e223b733a33393a225374616e64617264207374616e64616c6f6e6520706564657374616c207761736820626173696e223b733a31323a2273657269616c6e756d626572223b733a303a22223b733a31363a226174747269627574655f76616c756573223b733a393a22436861727465726564223b733a31383a226174747269627574655f647476616c756573223b4e3b733a32313a22616c6c6f775f616c745f6465736372697074696f6e223b733a313a2230223b733a31333a2269735f73657269616c697a6564223b733a313a2230223b733a383a227175616e74697479223b693a313b733a383a22646973636f756e74223b643a303b733a31333a22646973636f756e745f74797065223b693a303b733a383a22696e5f73746f636b223b733a363a2232332e303030223b733a353a227072696365223b733a383a2231313030302e3030223b733a31383a22726563656976696e675f7175616e74697479223b733a353a22312e303030223b733a32363a22726563656976696e675f7175616e746974795f63686f69636573223b613a313a7b693a313b733a323a227831223b7d733a353a22746f74616c223b733a31303a2231313030302e30303030223b7d7d726563765f6d6f64657c733a363a2272657475726e223b726563765f737570706c6965727c693a2d313b73616c65735f656d706c6f7965657c693a313b636173685f61646a7573746d656e745f616d6f756e747c643a303b),
('ospos_session:d356e781015ef4e21bf62c18fcff6b81', '::1', '2026-06-18 07:14:35', 0x5f5f63695f6c6173745f726567656e65726174657c693a313738313736363832303b5f63695f70726576696f75735f75726c7c733a33343a22687474703a2f2f6c6f63616c686f73742f6f73706f732f7075626c69632f686f6d65223b706572736f6e5f69647c733a313a2231223b6d656e755f67726f75707c733a343a22686f6d65223b);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_stock_locations`
--

CREATE TABLE `ospos_stock_locations` (
  `location_id` int(11) NOT NULL,
  `location_name` varchar(255) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ospos_stock_locations`
--

INSERT INTO `ospos_stock_locations` (`location_id`, `location_name`, `deleted`) VALUES
(1, 'stock', 0);

-- --------------------------------------------------------

--
-- Table structure for table `ospos_suppliers`
--

CREATE TABLE `ospos_suppliers` (
  `person_id` int(10) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `agency_name` varchar(255) NOT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `tax_id` varchar(32) NOT NULL DEFAULT '',
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `category` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_tax_categories`
--

CREATE TABLE `ospos_tax_categories` (
  `tax_category_id` int(10) NOT NULL,
  `tax_category` varchar(32) NOT NULL,
  `tax_group_sequence` tinyint(1) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_tax_codes`
--

CREATE TABLE `ospos_tax_codes` (
  `tax_code_id` int(11) NOT NULL,
  `tax_code` varchar(32) NOT NULL,
  `tax_code_name` varchar(255) NOT NULL DEFAULT '',
  `city` varchar(255) NOT NULL DEFAULT '',
  `state` varchar(255) NOT NULL DEFAULT '',
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_tax_jurisdictions`
--

CREATE TABLE `ospos_tax_jurisdictions` (
  `jurisdiction_id` int(11) NOT NULL,
  `jurisdiction_name` varchar(255) DEFAULT NULL,
  `tax_group` varchar(32) NOT NULL,
  `tax_type` smallint(2) NOT NULL,
  `reporting_authority` varchar(255) DEFAULT NULL,
  `tax_group_sequence` tinyint(1) NOT NULL DEFAULT 0,
  `cascade_sequence` tinyint(1) NOT NULL DEFAULT 0,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ospos_tax_rates`
--

CREATE TABLE `ospos_tax_rates` (
  `tax_rate_id` int(11) NOT NULL,
  `rate_tax_code_id` int(11) NOT NULL,
  `rate_tax_category_id` int(10) NOT NULL,
  `rate_jurisdiction_id` int(11) NOT NULL,
  `tax_rate` decimal(15,4) NOT NULL DEFAULT 0.0000,
  `tax_rounding_code` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ospos_app_config`
--
ALTER TABLE `ospos_app_config`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `ospos_attribute_definitions`
--
ALTER TABLE `ospos_attribute_definitions`
  ADD PRIMARY KEY (`definition_id`),
  ADD KEY `definition_fk` (`definition_fk`),
  ADD KEY `definition_name` (`definition_name`),
  ADD KEY `definition_type` (`definition_type`);

--
-- Indexes for table `ospos_attribute_links`
--
ALTER TABLE `ospos_attribute_links`
  ADD UNIQUE KEY `attribute_links_uq1` (`attribute_id`,`definition_id`,`item_id`,`sale_id`,`receiving_id`),
  ADD UNIQUE KEY `attribute_links_uq2` (`item_id`,`receiving_id`,`sale_id`,`definition_id`,`attribute_id`),
  ADD UNIQUE KEY `attribute_links_uq3` (`generated_unique_column`),
  ADD KEY `attribute_id` (`attribute_id`),
  ADD KEY `definition_id` (`definition_id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `sale_id` (`sale_id`),
  ADD KEY `receiving_id` (`receiving_id`);

--
-- Indexes for table `ospos_attribute_values`
--
ALTER TABLE `ospos_attribute_values`
  ADD PRIMARY KEY (`attribute_id`),
  ADD UNIQUE KEY `attribute_value` (`attribute_value`),
  ADD UNIQUE KEY `attribute_date` (`attribute_date`),
  ADD UNIQUE KEY `attribute_decimal` (`attribute_decimal`);

--
-- Indexes for table `ospos_cash_up`
--
ALTER TABLE `ospos_cash_up`
  ADD PRIMARY KEY (`cashup_id`),
  ADD KEY `open_employee_id` (`open_employee_id`),
  ADD KEY `close_employee_id` (`close_employee_id`);

--
-- Indexes for table `ospos_customers`
--
ALTER TABLE `ospos_customers`
  ADD PRIMARY KEY (`person_id`),
  ADD KEY `package_id` (`package_id`),
  ADD KEY `sales_tax_code_id` (`sales_tax_code_id`),
  ADD KEY `account_number` (`account_number`),
  ADD KEY `company_name` (`company_name`);

--
-- Indexes for table `ospos_customers_packages`
--
ALTER TABLE `ospos_customers_packages`
  ADD PRIMARY KEY (`package_id`);

--
-- Indexes for table `ospos_customers_points`
--
ALTER TABLE `ospos_customers_points`
  ADD PRIMARY KEY (`id`),
  ADD KEY `person_id` (`person_id`),
  ADD KEY `package_id` (`package_id`),
  ADD KEY `sale_id` (`sale_id`);

--
-- Indexes for table `ospos_dinner_tables`
--
ALTER TABLE `ospos_dinner_tables`
  ADD PRIMARY KEY (`dinner_table_id`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `ospos_employees`
--
ALTER TABLE `ospos_employees`
  ADD PRIMARY KEY (`person_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `ospos_expenses`
--
ALTER TABLE `ospos_expenses`
  ADD PRIMARY KEY (`expense_id`),
  ADD KEY `expense_category_id` (`expense_category_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `date` (`date`),
  ADD KEY `payment_type` (`payment_type`),
  ADD KEY `amount` (`amount`),
  ADD KEY `ospos_expenses_ibfk_3` (`supplier_id`);

--
-- Indexes for table `ospos_expense_categories`
--
ALTER TABLE `ospos_expense_categories`
  ADD PRIMARY KEY (`expense_category_id`),
  ADD UNIQUE KEY `category_name` (`category_name`),
  ADD KEY `category_description` (`category_description`);

--
-- Indexes for table `ospos_giftcards`
--
ALTER TABLE `ospos_giftcards`
  ADD PRIMARY KEY (`giftcard_id`),
  ADD UNIQUE KEY `giftcard_number` (`giftcard_number`),
  ADD KEY `person_id` (`person_id`);

--
-- Indexes for table `ospos_grants`
--
ALTER TABLE `ospos_grants`
  ADD PRIMARY KEY (`permission_id`,`person_id`),
  ADD KEY `ospos_grants_ibfk_2` (`person_id`);

--
-- Indexes for table `ospos_inventory`
--
ALTER TABLE `ospos_inventory`
  ADD PRIMARY KEY (`trans_id`),
  ADD KEY `trans_items` (`trans_items`),
  ADD KEY `trans_user` (`trans_user`),
  ADD KEY `trans_location` (`trans_location`),
  ADD KEY `trans_date` (`trans_date`),
  ADD KEY `trans_items_trans_date` (`trans_items`,`trans_date`);

--
-- Indexes for table `ospos_items`
--
ALTER TABLE `ospos_items`
  ADD PRIMARY KEY (`item_id`),
  ADD UNIQUE KEY `items_uq1` (`supplier_id`,`item_id`,`deleted`,`item_type`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `item_number` (`item_number`),
  ADD KEY `deleted` (`deleted`,`item_type`),
  ADD KEY `item_id` (`item_id`,`deleted`);

--
-- Indexes for table `ospos_items_taxes`
--
ALTER TABLE `ospos_items_taxes`
  ADD PRIMARY KEY (`item_id`,`name`,`percent`);

--
-- Indexes for table `ospos_item_kits`
--
ALTER TABLE `ospos_item_kits`
  ADD PRIMARY KEY (`item_kit_id`),
  ADD KEY `item_kit_number` (`item_kit_number`),
  ADD KEY `name` (`name`,`description`);

--
-- Indexes for table `ospos_item_kit_items`
--
ALTER TABLE `ospos_item_kit_items`
  ADD PRIMARY KEY (`item_kit_id`,`item_id`,`quantity`),
  ADD KEY `ospos_item_kit_items_ibfk_2` (`item_id`);

--
-- Indexes for table `ospos_item_quantities`
--
ALTER TABLE `ospos_item_quantities`
  ADD PRIMARY KEY (`item_id`,`location_id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `ospos_migrations`
--
ALTER TABLE `ospos_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ospos_modules`
--
ALTER TABLE `ospos_modules`
  ADD PRIMARY KEY (`module_id`),
  ADD UNIQUE KEY `desc_lang_key` (`desc_lang_key`),
  ADD UNIQUE KEY `name_lang_key` (`name_lang_key`);

--
-- Indexes for table `ospos_people`
--
ALTER TABLE `ospos_people`
  ADD PRIMARY KEY (`person_id`),
  ADD KEY `email` (`email`),
  ADD KEY `first_name` (`first_name`,`last_name`,`email`,`phone_number`);

--
-- Indexes for table `ospos_permissions`
--
ALTER TABLE `ospos_permissions`
  ADD PRIMARY KEY (`permission_id`),
  ADD KEY `module_id` (`module_id`),
  ADD KEY `ospos_permissions_ibfk_2` (`location_id`);

--
-- Indexes for table `ospos_receivings`
--
ALTER TABLE `ospos_receivings`
  ADD PRIMARY KEY (`receiving_id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `reference` (`reference`),
  ADD KEY `receiving_time` (`receiving_time`);

--
-- Indexes for table `ospos_receivings_items`
--
ALTER TABLE `ospos_receivings_items`
  ADD PRIMARY KEY (`receiving_id`,`item_id`,`line`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `ospos_sales`
--
ALTER TABLE `ospos_sales`
  ADD PRIMARY KEY (`sale_id`),
  ADD UNIQUE KEY `invoice_number` (`invoice_number`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `sale_time` (`sale_time`),
  ADD KEY `dinner_table_id` (`dinner_table_id`);

--
-- Indexes for table `ospos_sales_items`
--
ALTER TABLE `ospos_sales_items`
  ADD PRIMARY KEY (`sale_id`,`item_id`,`line`),
  ADD KEY `sale_id` (`sale_id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `item_location` (`item_location`);

--
-- Indexes for table `ospos_sales_items_taxes`
--
ALTER TABLE `ospos_sales_items_taxes`
  ADD PRIMARY KEY (`sale_id`,`item_id`,`line`,`name`,`percent`),
  ADD KEY `sale_id` (`sale_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `ospos_sales_payments`
--
ALTER TABLE `ospos_sales_payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `payment_sale` (`sale_id`,`payment_type`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `payment_time` (`payment_time`);

--
-- Indexes for table `ospos_sales_reward_points`
--
ALTER TABLE `ospos_sales_reward_points`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sale_id` (`sale_id`);

--
-- Indexes for table `ospos_sales_taxes`
--
ALTER TABLE `ospos_sales_taxes`
  ADD PRIMARY KEY (`sales_taxes_id`),
  ADD KEY `print_sequence` (`sale_id`,`print_sequence`,`tax_group`);

--
-- Indexes for table `ospos_sessions`
--
ALTER TABLE `ospos_sessions`
  ADD PRIMARY KEY (`id`,`ip_address`),
  ADD KEY `ospos_sessions_timestamp` (`timestamp`);

--
-- Indexes for table `ospos_stock_locations`
--
ALTER TABLE `ospos_stock_locations`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `ospos_suppliers`
--
ALTER TABLE `ospos_suppliers`
  ADD PRIMARY KEY (`person_id`),
  ADD UNIQUE KEY `account_number` (`account_number`),
  ADD KEY `category` (`category`),
  ADD KEY `company_name` (`company_name`,`deleted`);

--
-- Indexes for table `ospos_tax_categories`
--
ALTER TABLE `ospos_tax_categories`
  ADD PRIMARY KEY (`tax_category_id`);

--
-- Indexes for table `ospos_tax_codes`
--
ALTER TABLE `ospos_tax_codes`
  ADD PRIMARY KEY (`tax_code_id`);

--
-- Indexes for table `ospos_tax_jurisdictions`
--
ALTER TABLE `ospos_tax_jurisdictions`
  ADD PRIMARY KEY (`jurisdiction_id`),
  ADD UNIQUE KEY `tax_jurisdictions_uq1` (`tax_group`);

--
-- Indexes for table `ospos_tax_rates`
--
ALTER TABLE `ospos_tax_rates`
  ADD PRIMARY KEY (`tax_rate_id`),
  ADD KEY `rate_tax_category_id` (`rate_tax_category_id`),
  ADD KEY `rate_tax_code_id` (`rate_tax_code_id`),
  ADD KEY `rate_jurisdiction_id` (`rate_jurisdiction_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ospos_attribute_definitions`
--
ALTER TABLE `ospos_attribute_definitions`
  MODIFY `definition_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ospos_attribute_values`
--
ALTER TABLE `ospos_attribute_values`
  MODIFY `attribute_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ospos_cash_up`
--
ALTER TABLE `ospos_cash_up`
  MODIFY `cashup_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ospos_customers_packages`
--
ALTER TABLE `ospos_customers_packages`
  MODIFY `package_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ospos_customers_points`
--
ALTER TABLE `ospos_customers_points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ospos_dinner_tables`
--
ALTER TABLE `ospos_dinner_tables`
  MODIFY `dinner_table_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ospos_expenses`
--
ALTER TABLE `ospos_expenses`
  MODIFY `expense_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ospos_expense_categories`
--
ALTER TABLE `ospos_expense_categories`
  MODIFY `expense_category_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ospos_giftcards`
--
ALTER TABLE `ospos_giftcards`
  MODIFY `giftcard_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ospos_inventory`
--
ALTER TABLE `ospos_inventory`
  MODIFY `trans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `ospos_items`
--
ALTER TABLE `ospos_items`
  MODIFY `item_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `ospos_item_kits`
--
ALTER TABLE `ospos_item_kits`
  MODIFY `item_kit_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ospos_migrations`
--
ALTER TABLE `ospos_migrations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `ospos_people`
--
ALTER TABLE `ospos_people`
  MODIFY `person_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ospos_receivings`
--
ALTER TABLE `ospos_receivings`
  MODIFY `receiving_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ospos_sales`
--
ALTER TABLE `ospos_sales`
  MODIFY `sale_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `ospos_sales_payments`
--
ALTER TABLE `ospos_sales_payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `ospos_sales_reward_points`
--
ALTER TABLE `ospos_sales_reward_points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ospos_sales_taxes`
--
ALTER TABLE `ospos_sales_taxes`
  MODIFY `sales_taxes_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ospos_stock_locations`
--
ALTER TABLE `ospos_stock_locations`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ospos_tax_categories`
--
ALTER TABLE `ospos_tax_categories`
  MODIFY `tax_category_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ospos_tax_codes`
--
ALTER TABLE `ospos_tax_codes`
  MODIFY `tax_code_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ospos_tax_jurisdictions`
--
ALTER TABLE `ospos_tax_jurisdictions`
  MODIFY `jurisdiction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ospos_tax_rates`
--
ALTER TABLE `ospos_tax_rates`
  MODIFY `tax_rate_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ospos_attribute_definitions`
--
ALTER TABLE `ospos_attribute_definitions`
  ADD CONSTRAINT `fk_ospos_attribute_definitions_ibfk_1` FOREIGN KEY (`definition_fk`) REFERENCES `ospos_attribute_definitions` (`definition_id`);

--
-- Constraints for table `ospos_attribute_links`
--
ALTER TABLE `ospos_attribute_links`
  ADD CONSTRAINT `ospos_attribute_links_ibfk_1` FOREIGN KEY (`definition_id`) REFERENCES `ospos_attribute_definitions` (`definition_id`),
  ADD CONSTRAINT `ospos_attribute_links_ibfk_2` FOREIGN KEY (`attribute_id`) REFERENCES `ospos_attribute_values` (`attribute_id`),
  ADD CONSTRAINT `ospos_attribute_links_ibfk_3` FOREIGN KEY (`item_id`) REFERENCES `ospos_items` (`item_id`),
  ADD CONSTRAINT `ospos_attribute_links_ibfk_4` FOREIGN KEY (`receiving_id`) REFERENCES `ospos_receivings` (`receiving_id`),
  ADD CONSTRAINT `ospos_attribute_links_ibfk_5` FOREIGN KEY (`sale_id`) REFERENCES `ospos_sales` (`sale_id`);

--
-- Constraints for table `ospos_cash_up`
--
ALTER TABLE `ospos_cash_up`
  ADD CONSTRAINT `ospos_cash_up_ibfk_1` FOREIGN KEY (`open_employee_id`) REFERENCES `ospos_employees` (`person_id`),
  ADD CONSTRAINT `ospos_cash_up_ibfk_2` FOREIGN KEY (`close_employee_id`) REFERENCES `ospos_employees` (`person_id`);

--
-- Constraints for table `ospos_customers`
--
ALTER TABLE `ospos_customers`
  ADD CONSTRAINT `ospos_customers_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `ospos_people` (`person_id`),
  ADD CONSTRAINT `ospos_customers_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `ospos_customers_packages` (`package_id`),
  ADD CONSTRAINT `ospos_customers_ibfk_3` FOREIGN KEY (`sales_tax_code_id`) REFERENCES `ospos_tax_codes` (`tax_code_id`);

--
-- Constraints for table `ospos_customers_points`
--
ALTER TABLE `ospos_customers_points`
  ADD CONSTRAINT `ospos_customers_points_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `ospos_customers` (`person_id`),
  ADD CONSTRAINT `ospos_customers_points_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `ospos_customers_packages` (`package_id`),
  ADD CONSTRAINT `ospos_customers_points_ibfk_3` FOREIGN KEY (`sale_id`) REFERENCES `ospos_sales` (`sale_id`);

--
-- Constraints for table `ospos_employees`
--
ALTER TABLE `ospos_employees`
  ADD CONSTRAINT `ospos_employees_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `ospos_people` (`person_id`);

--
-- Constraints for table `ospos_expenses`
--
ALTER TABLE `ospos_expenses`
  ADD CONSTRAINT `ospos_expenses_ibfk_1` FOREIGN KEY (`expense_category_id`) REFERENCES `ospos_expense_categories` (`expense_category_id`),
  ADD CONSTRAINT `ospos_expenses_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `ospos_employees` (`person_id`),
  ADD CONSTRAINT `ospos_expenses_ibfk_3` FOREIGN KEY (`supplier_id`) REFERENCES `ospos_suppliers` (`person_id`);

--
-- Constraints for table `ospos_giftcards`
--
ALTER TABLE `ospos_giftcards`
  ADD CONSTRAINT `ospos_giftcards_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `ospos_people` (`person_id`);

--
-- Constraints for table `ospos_grants`
--
ALTER TABLE `ospos_grants`
  ADD CONSTRAINT `ospos_grants_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `ospos_permissions` (`permission_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ospos_grants_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `ospos_employees` (`person_id`) ON DELETE CASCADE;

--
-- Constraints for table `ospos_inventory`
--
ALTER TABLE `ospos_inventory`
  ADD CONSTRAINT `ospos_inventory_ibfk_1` FOREIGN KEY (`trans_items`) REFERENCES `ospos_items` (`item_id`),
  ADD CONSTRAINT `ospos_inventory_ibfk_2` FOREIGN KEY (`trans_user`) REFERENCES `ospos_employees` (`person_id`),
  ADD CONSTRAINT `ospos_inventory_ibfk_3` FOREIGN KEY (`trans_location`) REFERENCES `ospos_stock_locations` (`location_id`);

--
-- Constraints for table `ospos_items`
--
ALTER TABLE `ospos_items`
  ADD CONSTRAINT `ospos_items_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `ospos_suppliers` (`person_id`);

--
-- Constraints for table `ospos_items_taxes`
--
ALTER TABLE `ospos_items_taxes`
  ADD CONSTRAINT `ospos_items_taxes_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `ospos_items` (`item_id`) ON DELETE CASCADE;

--
-- Constraints for table `ospos_item_kit_items`
--
ALTER TABLE `ospos_item_kit_items`
  ADD CONSTRAINT `ospos_item_kit_items_ibfk_1` FOREIGN KEY (`item_kit_id`) REFERENCES `ospos_item_kits` (`item_kit_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ospos_item_kit_items_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `ospos_items` (`item_id`) ON DELETE CASCADE;

--
-- Constraints for table `ospos_item_quantities`
--
ALTER TABLE `ospos_item_quantities`
  ADD CONSTRAINT `ospos_item_quantities_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `ospos_items` (`item_id`),
  ADD CONSTRAINT `ospos_item_quantities_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `ospos_stock_locations` (`location_id`);

--
-- Constraints for table `ospos_permissions`
--
ALTER TABLE `ospos_permissions`
  ADD CONSTRAINT `ospos_permissions_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `ospos_modules` (`module_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ospos_permissions_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `ospos_stock_locations` (`location_id`) ON DELETE CASCADE;

--
-- Constraints for table `ospos_receivings`
--
ALTER TABLE `ospos_receivings`
  ADD CONSTRAINT `ospos_receivings_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `ospos_employees` (`person_id`),
  ADD CONSTRAINT `ospos_receivings_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `ospos_suppliers` (`person_id`);

--
-- Constraints for table `ospos_receivings_items`
--
ALTER TABLE `ospos_receivings_items`
  ADD CONSTRAINT `ospos_receivings_items_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `ospos_items` (`item_id`),
  ADD CONSTRAINT `ospos_receivings_items_ibfk_2` FOREIGN KEY (`receiving_id`) REFERENCES `ospos_receivings` (`receiving_id`);

--
-- Constraints for table `ospos_sales`
--
ALTER TABLE `ospos_sales`
  ADD CONSTRAINT `ospos_sales_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `ospos_employees` (`person_id`),
  ADD CONSTRAINT `ospos_sales_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `ospos_customers` (`person_id`),
  ADD CONSTRAINT `ospos_sales_ibfk_3` FOREIGN KEY (`dinner_table_id`) REFERENCES `ospos_dinner_tables` (`dinner_table_id`);

--
-- Constraints for table `ospos_sales_items`
--
ALTER TABLE `ospos_sales_items`
  ADD CONSTRAINT `ospos_sales_items_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `ospos_items` (`item_id`),
  ADD CONSTRAINT `ospos_sales_items_ibfk_2` FOREIGN KEY (`sale_id`) REFERENCES `ospos_sales` (`sale_id`),
  ADD CONSTRAINT `ospos_sales_items_ibfk_3` FOREIGN KEY (`item_location`) REFERENCES `ospos_stock_locations` (`location_id`);

--
-- Constraints for table `ospos_sales_items_taxes`
--
ALTER TABLE `ospos_sales_items_taxes`
  ADD CONSTRAINT `ospos_sales_items_taxes_ibfk_1` FOREIGN KEY (`sale_id`,`item_id`,`line`) REFERENCES `ospos_sales_items` (`sale_id`, `item_id`, `line`),
  ADD CONSTRAINT `ospos_sales_items_taxes_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `ospos_items` (`item_id`);

--
-- Constraints for table `ospos_sales_payments`
--
ALTER TABLE `ospos_sales_payments`
  ADD CONSTRAINT `ospos_sales_payments_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `ospos_sales` (`sale_id`),
  ADD CONSTRAINT `ospos_sales_payments_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `ospos_employees` (`person_id`);

--
-- Constraints for table `ospos_sales_reward_points`
--
ALTER TABLE `ospos_sales_reward_points`
  ADD CONSTRAINT `ospos_sales_reward_points_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `ospos_sales` (`sale_id`);

--
-- Constraints for table `ospos_suppliers`
--
ALTER TABLE `ospos_suppliers`
  ADD CONSTRAINT `ospos_suppliers_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `ospos_people` (`person_id`);

--
-- Constraints for table `ospos_tax_rates`
--
ALTER TABLE `ospos_tax_rates`
  ADD CONSTRAINT `ospos_tax_rates_ibfk_1` FOREIGN KEY (`rate_tax_category_id`) REFERENCES `ospos_tax_categories` (`tax_category_id`),
  ADD CONSTRAINT `ospos_tax_rates_ibfk_2` FOREIGN KEY (`rate_tax_code_id`) REFERENCES `ospos_tax_codes` (`tax_code_id`),
  ADD CONSTRAINT `ospos_tax_rates_ibfk_3` FOREIGN KEY (`rate_jurisdiction_id`) REFERENCES `ospos_tax_jurisdictions` (`jurisdiction_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
