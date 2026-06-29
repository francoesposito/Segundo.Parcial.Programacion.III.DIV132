-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-06-2026 a las 06:31:40
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `basetp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `category`, `price`, `active`) VALUES
(1, 'Counter-Strike 2', 'cs2_portada.jpg', 'disparos', 0.00, 1),
(2, 'Resident Evil 4 Remake', 're4_remake_cover.png', 'aventuras', 59.99, 1),
(3, 'Mario Kart 8 Deluxe', 'mk8_deluxe.jpg', 'carreras', 59.99, 1),
(4, 'Resident Evil 2', 're2_classic.jpg', 'aventuras', 39.99, 1),
(5, 'Counter-Strike 1.6', 'cs16_retro.png', 'disparos', 9.99, 1),
(6, 'Forza Horizon 5', 'forza5.jpg', 'carreras', 59.99, 1),
(7, 'DOOM Eternal', 'doom_eternal.jpg', 'disparos', 39.99, 1),
(8, 'The Witcher 3', 'witcher3.jpg', 'aventuras', 29.99, 1),
(9, 'Need for Speed Heat', 'nfs_heat.jpg', 'carreras', 34.99, 1),
(10, 'Call of Duty Modern Warfare II', 'cod_mw2.jpg', 'disparos', 69.99, 1),
(11, 'Red Dead Redemption 2', 'rdr2.jpg', 'aventuras', 49.99, 1),
(12, 'Gran Turismo 7', 'gt7.jpg', 'carreras', 69.99, 1),
(13, 'Battlefield 2042', 'bf2042.jpg', 'disparos', 29.99, 1),
(14, 'Assassin\'s Creed Valhalla', 'ac_valhalla.jpg', 'aventuras', 49.99, 1),
(15, 'F1 24', 'f1_24.jpg', 'carreras', 69.99, 1),
(16, 'Rainbow Six Siege', 'r6s.jpg', 'disparos', 19.99, 1),
(17, 'Horizon Zero Dawn', 'hzd.jpg', 'aventuras', 39.99, 1),
(18, 'Assetto Corsa Competizione', 'acc.jpg', 'carreras', 39.99, 1),
(19, 'Valorant', 'valorant.jpg', 'disparos', 0.00, 1),
(20, 'God of War', 'gow.jpg', 'aventuras', 49.99, 1),
(21, 'The Crew Motorfest', 'crew_motorfest.jpg', 'carreras', 59.99, 1),
(22, 'Escape from Tarkov', 'tarkov.jpg', 'disparos', 44.99, 1),
(23, 'Elden Ring', 'elden_ring.jpg', 'aventuras', 59.99, 1),
(24, 'Hot Wheels Unleashed 2', 'hw_unleashed2.jpg', 'carreras', 49.99, 1),
(25, 'Apex Legends', 'apex.jpg', 'disparos', 0.00, 1),
(26, 'Tomb Raider', 'tomb_raider.jpg', 'aventuras', 19.99, 1),
(27, 'DIRT Rally 2.0', 'dirt_rally2.jpg', 'carreras', 24.99, 1),
(28, 'Overwatch 2', 'overwatch2.jpg', 'disparos', 0.00, 1),
(29, 'Uncharted 4', 'uncharted4.jpg', 'aventuras', 39.99, 1),
(30, 'Project CARS 3', 'project_cars3.jpg', 'carreras', 29.99, 1),
(31, 'PUBG Battlegrounds', 'pubg.jpg', 'disparos', 0.00, 1),
(32, 'Marvel\'s Spider-Man Remastered', 'spiderman.jpg', 'aventuras', 59.99, 1),
(33, 'WRC Generations', 'wrc_generations.jpg', 'carreras', 39.99, 1),
(34, 'Far Cry 6', 'farcry6.jpg', 'disparos', 49.99, 1),
(35, 'Ghost of Tsushima', 'ghost_tsushima.jpg', 'aventuras', 59.99, 1),
(36, 'Trackmania', 'trackmania.jpg', 'carreras', 0.00, 1),
(37, 'Halo Infinite', 'halo_infinite.jpg', 'disparos', 59.99, 1),
(38, 'The Legend of Zelda: Tears of the Kingdom', 'zelda_totk.jpg', 'aventuras', 69.99, 1),
(39, 'Ride 5', 'ride5.jpg', 'carreras', 59.99, 1),
(40, 'Destiny 2', 'destiny2.jpg', 'disparos', 0.00, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(150) NOT NULL,
  `date` datetime NOT NULL,
  `total_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales_products`
--

CREATE TABLE `sales_products` (
  `id_sale` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `surveys`
--

CREATE TABLE `surveys` (
  `id` int(11) NOT NULL,
  `opinion` text DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `newsletter` tinyint(1) DEFAULT 0,
  `rating` int(11) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `es_admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `es_admin`) VALUES
(1, 'admin', 'admin@gmail.com', 'admin123', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sales_products`
--
ALTER TABLE `sales_products`
  ADD PRIMARY KEY (`id_sale`,`id_product`),
  ADD KEY `id_product` (`id_product`);

--
-- Indices de la tabla `surveys`
--
ALTER TABLE `surveys`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `surveys`
--
ALTER TABLE `surveys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `sales_products`
--
ALTER TABLE `sales_products`
  ADD CONSTRAINT `sales_products_ibfk_1` FOREIGN KEY (`id_sale`) REFERENCES `sales` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sales_products_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
