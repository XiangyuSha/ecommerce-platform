-- MySQL dump 10.13  Distrib 9.2.0, for macos14.7 (x86_64)
--
-- Host: localhost    Database: b2b_ecommerce
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AuditLogs`
--

DROP TABLE IF EXISTS `AuditLogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AuditLogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `action` enum('CREATE','UPDATE','DELETE','READ') NOT NULL,
  `entity_type` enum('User','Product','Order') NOT NULL,
  `entity_id` int NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `auditlogs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AuditLogs`
--

LOCK TABLES `AuditLogs` WRITE;
/*!40000 ALTER TABLE `AuditLogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `AuditLogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `status` enum('Pending','Approved','Shipped','Delivered') NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,'iPhone 15','Latest Apple iPhone 15 with A16 chip.',999.99,11,'2025-03-12 02:39:26','2025-03-12 07:47:09','https://www.cnet.com/a/img/resize/e21b3371c11612c4e14928a6a237e7b0889745f8/hub/2023/09/12/2d9d37cc-7d99-4f81-8da2-8f3a674f4243/screenshot-2023-09-12-at-10-38-30-am.png?auto=webp&width=1200'),(2,'MacBook Air','Apple M2 chip MacBook Air.',1299.99,5,'2025-03-12 02:39:26','2025-03-12 03:37:18','https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-skyblue-select-202503?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1739303844511'),(3,'Sony Headphones','Noise-canceling wireless headphones.',299.99,20,'2025-03-12 02:39:26','2025-03-12 03:37:18','https://m.media-amazon.com/images/I/51wdav0Z+2L._AC_SY300_SX300_.jpg'),(4,'Samsung Galaxy S24','Latest Samsung flagship smartphone.',899.99,15,'2025-03-12 02:39:26','2025-03-12 03:37:18','https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6569/6569855_sd.jpg;maxHeight=640;maxWidth=550;format=webp'),(5,'Nintendo Switch','Gaming console with Joy-Con controllers.',299.99,25,'2025-03-12 02:39:26','2025-03-12 03:37:18','https://m.media-amazon.com/images/I/61WS2Fbvm5L._AC_SX679_.jpg'),(6,'Dell XPS 13 Laptop','13-inch laptop with InfinityEdge display and Intel Core i7 processor.',1199.99,10,'2025-03-12 03:21:31','2025-03-12 03:37:19','https://media.wired.com/photos/59327e7f44db296121d6b8fb/master/w_2240,c_limit/gadget-1.jpg');
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` enum('SuperAdmin','Admin','Staff','Customer') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES (1,'SuperAdmin'),(2,'Admin'),(3,'Staff'),(4,'Customer');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `totp_secret` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `Roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (9,'new_user','test@example.com','$2b$10$QODK63gdi/aDIjtf20FhLOR3j6tkYO1PhRWIJcKMfeLL11R/p3ww.',4,'2025-03-11 09:16:00','KNOUC43ZK4ZHKURFPJTWMYKYPNID4TLP'),(14,NULL,'test@21.com','$2b$10$bfjFxh6v9QsvUtHfsJNA9./HfZSquur16wD.N/3Hpg80G6ZeQSTUy',4,'2025-03-11 09:27:16','LAQUSWZOMRDWE22OEN4GGW3UINAHM6KA'),(15,NULL,'121@343','$2b$10$Eo7hAtunBIDPePDBQooUc.krOwj3KSugmq9acnMkPjTBM9WoqrWBW',4,'2025-03-11 09:27:34','LBGF4VT5KA5XQTZQLBTDEPC2MQYTALCJ'),(16,NULL,'test1@example.com','$2b$10$U86M3vbI3.pIhbRSRR2htuLHzzs2H/g6CV.a7Cnj5o1Co0Oko5wDy',2,'2025-03-11 09:56:59','H5UDUQZJFYZWWOSPNU7UU4JSLBKW2QKS'),(17,NULL,'xiangyu_sha@berkeley.edu','$2b$10$5wNHQQqYf/EQDjHF0Pi5HOUnaf8MwBI5Tk1GzMRfXa2GbHNZ5cl9G',4,'2025-03-11 10:10:05','PVIE4LZMFFLFEU3LJRUGMWSMHBJDAVLE'),(18,NULL,'1222@edu','$2b$10$0m0iyFQiti5VwjJkHbnlPuoTBWtmRYe3/IQjY7fZieOQDcuP6oXLi',4,'2025-03-12 00:14:55','OI4USLRKIJGTQSDZGZWXGRD3JRAVGJCH'),(19,NULL,'1122','$2b$10$mK0aTygwn322hRMhRFRE8OPSIaqqPgkUp6Gt.FIN25kd2KRE.kvoC',4,'2025-03-12 01:03:59','MRRGWZKKFE5HIN2EPFIVE6ZPJR3EOIZP'),(20,NULL,'11','$2b$10$FXbnKLy4dWsmlTlAgLAAROUiCGy6XBfadJQkyf/C4CCsaiKCKlCee',4,'2025-03-12 01:50:52','KFDGYMJ2LJMHIJR3JJNFIVC6GQ2DG5J2'),(21,NULL,'111','$2b$10$uP9kpC0CxhgP2UpV8tOWGOcgsyBZzfm1ki65Pmr24EMzBUc6vdwHa',4,'2025-03-12 02:00:49','LNQXSQRBNU7DO5JFFZDSCMTXPVWH2I3T'),(22,NULL,'staff','$2b$10$ElUhYXuRYuFx.52FGP9NHeLe1lfc0tng68Ln5vUDf1Oo96sbUr81G',4,'2025-03-12 03:59:45','FJAUI63XPMSU2STLK5AFA3TENYYSMIJV'),(23,NULL,'staff1','$2b$10$rSr1w5xZQzB.CPbO0KAnWewS0xcntkb0x3/O7ULiE.PxvSFZzllva',3,'2025-03-12 06:55:21','FAUFOUZTLNHF2VKVHR2S65CLKZJWKP2E'),(24,NULL,'staff2','$2b$10$kST12b6bHWnw8Dz6VJUQh.9pODBtOXIDrVI3KDD9V2K4qS7NL9cJK',3,'2025-03-12 07:22:44',NULL),(25,NULL,'Hello@com','$2b$10$e7vVWFnh/Y0wkJ5HL0NpFOIekDLr9sBqpwPhzrHGCw6yuAnx9oOY2',4,'2025-03-12 08:06:17',NULL),(26,NULL,'Hello2@com','$2b$10$rByDNiLhmTyf577w9BN/h.xtl6cDHve/h628ahcQn3BbUeJv444M2',4,'2025-03-12 08:12:01',NULL),(27,NULL,'admin','$2b$10$Pj4SPN3BY6e2Y0Yr061OSu0LYx1rh6kIbc2lsnQ2wFPHQOmXzWDzC',2,'2025-03-13 02:24:07',NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-13  1:27:18
