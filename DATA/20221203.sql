-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: lms
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_requests`
--

DROP TABLE IF EXISTS `admin_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_requests` (
  `requestid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`requestid`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `userid1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_requests`
--

LOCK TABLES `admin_requests` WRITE;
/*!40000 ALTER TABLE `admin_requests` DISABLE KEYS */;
INSERT INTO `admin_requests` VALUES (1,4,'Enroll for Applied Algorithms'),(2,4,'Enroll for Deep Learning Systems'),(3,4,'Enroll for Software Engineering'),(4,5,'Enroll for Applied Algorithms'),(5,5,'Enroll for Advanced Database Concepts'),(6,4,'Enroll for Deep Learning Systems');
/*!40000 ALTER TABLE `admin_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements` (
  `announcementid` int NOT NULL AUTO_INCREMENT,
  `DatePosted` varchar(255) DEFAULT NULL,
  `subj` varchar(255) DEFAULT NULL,
  `announcement` varchar(1000) DEFAULT NULL,
  `Course` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`announcementid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
INSERT INTO `announcements` VALUES (1,'11/05/22','Testing1','This is a test announcement-1','Big Data Applications'),(2,'11/04/22','Testing2','This is a test announcement-2','Computer Networks'),(3,'11/02/22','Testing3','This is a test announcement-3','Software Engineering'),(4,'11/03/22','Testing4','This is a test announcement-4','Computer Networks'),(5,'11/01/22','Testing5','This is a test announcement-5','Big Data Applications'),(6,'10/31/22','Testing6','This is a test announcement-6','Computer Networks'),(7,'11/29/22','Testing7','This is a test announcement-7','Software Engineering'),(8,'11/27/22','Testing8','This is a test announcement-8','Computer Networks'),(9,'11/26/22','Testing9','This is a test announcement-9','Big Data Applications');
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignments`
--

DROP TABLE IF EXISTS `assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `courseid` int DEFAULT NULL,
  `maxpoints` int DEFAULT NULL,
  `availabletilldate` datetime DEFAULT NULL,
  `duedate` datetime DEFAULT NULL,
  `assignment_title` varchar(45) DEFAULT NULL,
  `releasedate` datetime DEFAULT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `isTextEntry` tinyint DEFAULT NULL,
  `isFileUpload` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courseid_idx` (`courseid`),
  CONSTRAINT `courseidconstraint` FOREIGN KEY (`courseid`) REFERENCES `courses` (`courseid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignments`
--

LOCK TABLES `assignments` WRITE;
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
INSERT INTO `assignments` VALUES (1,8,100,'2022-11-27 23:59:00','2022-11-26 23:59:00','Assignment 7',NULL,NULL,NULL,NULL),(4,9,100,'2022-11-27 23:59:00','2022-11-26 23:59:00','Assignment 6',NULL,NULL,NULL,NULL),(5,8,100,'2022-11-30 23:59:00','2022-11-29 23:59:00','Assignment 8',NULL,NULL,NULL,NULL),(6,10,50,'2022-11-30 12:00:00','2022-11-30 12:00:00','Assignment 4',NULL,NULL,NULL,NULL),(7,10,100,'2022-12-01 23:59:00','2022-12-01 23:59:00','Assignment 5',NULL,NULL,NULL,NULL),(23,8,102,'2022-12-09 21:30:09','2022-12-08 21:30:09','CN_Assignment_7','2022-12-01 21:30:09','<ol><li>You have to implement <strong>Go back N</strong> protocol and <em class=\"ql-font-monospace\"><u>submit it</u></em></li></ol>',NULL,NULL),(24,9,100,'2022-12-15 17:55:50','2022-12-08 17:55:50','SE1','2022-12-03 17:55:50','<p><strong>dsndsdnsmdmnsdnsdnsdmsdnsmdnsmnd</strong></p><p><br></p>',NULL,NULL),(25,10,100,'2022-12-17 18:18:43','2022-12-16 18:18:43','BDA project','2022-12-03 18:18:43','<p>This is gonna be a <strong>project</strong> submission</p><p>Do it <em>asap</em></p><h2><span class=\"ql-font-monospace\">Good Luck</span></h2>',1,0),(27,10,100,'2022-12-23 18:25:12','2022-12-10 18:25:12','BDA project 2','2022-12-03 18:25:12','<p>Do this as well</p>',0,1);
/*!40000 ALTER TABLE `assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `courseid` int NOT NULL AUTO_INCREMENT,
  `coursename` varchar(45) NOT NULL,
  PRIMARY KEY (`courseid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'Applied Algorithms'),(2,'Applied Machine Learning'),(3,'Deep Learning Systems'),(4,'Introduction to Statistics'),(5,'Computer Vision'),(6,'Advanced Database Concepts'),(7,'Information Visualization'),(8,'Computer Networks'),(9,'Software Engineering'),(10,'Big Data Applications');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollment`
--

DROP TABLE IF EXISTS `enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollment` (
  `userid` int NOT NULL,
  `courseid` int NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`userid`,`courseid`),
  KEY `courseid_idx` (`courseid`),
  CONSTRAINT `courseid` FOREIGN KEY (`courseid`) REFERENCES `courses` (`courseid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollment`
--

LOCK TABLES `enrollment` WRITE;
/*!40000 ALTER TABLE `enrollment` DISABLE KEYS */;
INSERT INTO `enrollment` VALUES (1,8,'student'),(1,9,'student'),(1,10,'student');
/*!40000 ALTER TABLE `enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`userid`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'vicky@daiya','Vicky','Daiya','amanc'),(2,'sneh@chitalia','Sneh','Chitalia','2721e049'),(3,'dhruvin@shah','dhruvin','shah','[object Object]'),(4,'grusha@dharod','grusha','dharod','c44dd546aa4a5c1b69464679404082f1/4a5175de21a5'),(5,'neelay@gosar','neelay','gosar','6c5d3470cb9a1ef0d8b445910b5cceb9/9f5615c8976a');
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

-- Dump completed on 2022-12-03 13:59:01
