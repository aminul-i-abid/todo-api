-- MySQL dump 10.13  Distrib 9.2.0, for Win64 (x86_64)
--
-- Host: localhost    Database: todo_db
-- ------------------------------------------------------
-- Server version	9.2.0

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
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (1,'20250219130101_users.ts',1,'2025-02-19 17:13:02'),(2,'20250219130206_todos.ts',1,'2025-02-19 17:13:02'),(3,'20250219171251_refresh_tokens.ts',1,'2025-02-19 17:13:02');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `token` varchar(255) NOT NULL,
  `is_revoked` tinyint(1) DEFAULT '0',
  `expires_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `refresh_tokens_token_unique` (`token`),
  KEY `refresh_tokens_user_id_foreign` (`user_id`),
  CONSTRAINT `refresh_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES ('1aa43c44-316c-49e5-b0bc-7914f6e79e12','7b55a06a-1c76-418d-b21b-703f89f49d75','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdiNTVhMDZhLTFjNzYtNDE4ZC1iMjFiLTcwM2Y4OWY0OWQ3NSIsImlhdCI6MTczOTk4NjI2MiwiZXhwIjoxNzQwNTkxMDYyfQ.__ApWUcpN7O3fr54gzQprhCa54rBE1utbac_8gVd-z0',1,'2025-02-26 17:31:03','2025-02-19 17:31:03','2025-02-19 17:31:03'),('51788f18-2fa4-471c-9e20-77399e7deaa9','7b55a06a-1c76-418d-b21b-703f89f49d75','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdiNTVhMDZhLTFjNzYtNDE4ZC1iMjFiLTcwM2Y4OWY0OWQ3NSIsImlhdCI6MTczOTk4NjExNywiZXhwIjoxNzQwNTkwOTE3fQ.V0nOH6FR-8qhK8GDcX0bYJWcdYUbR_WD6UAQORgNXio',1,'2025-02-26 17:28:38','2025-02-19 17:28:37','2025-02-19 17:28:37'),('738abce5-2c09-4874-b41c-a12f43434da6','7b55a06a-1c76-418d-b21b-703f89f49d75','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdiNTVhMDZhLTFjNzYtNDE4ZC1iMjFiLTcwM2Y4OWY0OWQ3NSIsImlhdCI6MTczOTk4NzcyNiwiZXhwIjoxNzQwNTkyNTI2fQ.w3PoNs2wcnGZlfj8T50n3kCyzA1r7JpaDDW-xME2ujo',0,'2025-02-26 17:55:26','2025-02-19 17:55:26','2025-02-19 17:55:26'),('a1bf9181-2742-4947-99fc-17d34bd86ebd','7b55a06a-1c76-418d-b21b-703f89f49d75','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdiNTVhMDZhLTFjNzYtNDE4ZC1iMjFiLTcwM2Y4OWY0OWQ3NSIsImlhdCI6MTczOTk4NjI5NSwiZXhwIjoxNzQwNTkxMDk1fQ.aeX1A9z31QLNn3pj5yzmXwI0qjp18Rh6O_4pCtkQpJU',0,'2025-02-26 17:31:36','2025-02-19 17:31:35','2025-02-19 17:31:35'),('e5069e06-080c-4cce-9653-a557e75cc274','7b55a06a-1c76-418d-b21b-703f89f49d75','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdiNTVhMDZhLTFjNzYtNDE4ZC1iMjFiLTcwM2Y4OWY0OWQ3NSIsImlhdCI6MTczOTk4NjE1NiwiZXhwIjoxNzQwNTkwOTU2fQ.qQQ4vLySsXwtZmcBMCwTn0vbgDhGljqIrqs3ZEnc1VU',1,'2025-02-26 17:29:16','2025-02-19 17:29:16','2025-02-19 17:29:16'),('eab038d0-6f5e-4ebb-856d-b4497fd3d143','7b55a06a-1c76-418d-b21b-703f89f49d75','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdiNTVhMDZhLTFjNzYtNDE4ZC1iMjFiLTcwM2Y4OWY0OWQ3NSIsImlhdCI6MTczOTk4NzEyOCwiZXhwIjoxNzQwNTkxOTI4fQ.HUM-T_hkZCvro52H_Ovfqkg4QyTGgUdgamV1bowbslg',0,'2025-02-26 17:45:28','2025-02-19 17:45:28','2025-02-19 17:45:28'),('eee7e003-5a07-4357-82fa-9b2177d5e729','7b55a06a-1c76-418d-b21b-703f89f49d75','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdiNTVhMDZhLTFjNzYtNDE4ZC1iMjFiLTcwM2Y4OWY0OWQ3NSIsImlhdCI6MTczOTk4NTgyNiwiZXhwIjoxNzQwNTkwNjI2fQ.GoBz79ssmlS2u_rgjazbgx-9GGm1b1VgwhFdz6sPCFo',1,'2025-02-26 17:23:46','2025-02-19 17:23:46','2025-02-19 17:23:46');
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todos`
--

DROP TABLE IF EXISTS `todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todos` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `completed` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todos`
--

LOCK TABLES `todos` WRITE;
/*!40000 ALTER TABLE `todos` DISABLE KEYS */;
INSERT INTO `todos` VALUES ('da6e8eeb-820b-43a6-9969-cc377e21eee7','7b55a06a-1c76-418d-b21b-703f89f49d75','Buy groceries','Milk, Bread, Eggs',0,'2025-02-19 18:29:09','2025-02-19 18:29:09');
/*!40000 ALTER TABLE `todos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('7b55a06a-1c76-418d-b21b-703f89f49d75','john','john','john@example.com','$2b$10$7/3jOXoCJ1CCDj/EC2MM2uuDf.U5n9R47dVYOzjXQEQ2Jk0vs/V4m','2025-02-19 17:23:36','2025-02-19 17:23:36');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-20  1:14:53
