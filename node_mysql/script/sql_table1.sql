USE celke;

CREATE TABLE `usuarios`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(220) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `email` varchar(220) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb64 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `categoria`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(220) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb64 COLLATE=utf8mb4_unicode_ci;