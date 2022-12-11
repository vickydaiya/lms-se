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
  `DatePosted` date DEFAULT NULL,
  `subj` varchar(255) DEFAULT NULL,
  `announcement` varchar(1000) DEFAULT NULL,
  `Course` int DEFAULT NULL,
  PRIMARY KEY (`announcementid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
INSERT INTO `announcements` VALUES (1,'2022-12-01','Testing1','This is a test announcement-1',10),(2,'2022-12-01','Testing2','This is a test announcement-2',8),(3,'2022-12-01','Testing3','This is a test announcement-3',9),(4,'2022-12-01','Testing4','This is a test announcement-4',8),(5,'2022-12-01','Testing5','This is a test announcement-5',10),(10,'2022-12-07','CN Final Exam','<p>The final exam is on Dec 15 2022</p>',8),(11,'2022-12-07','CN Grades','<p>Guys check your <strong>final grade. </strong></p><h1><em>Enjoy</em></h1>',8);
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignments`
--

LOCK TABLES `assignments` WRITE;
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
INSERT INTO `assignments` VALUES (1,8,100,'2022-11-27 23:59:00','2022-11-26 23:59:00','Assignment 7',NULL,NULL,NULL,NULL),(4,9,100,'2022-11-27 23:59:00','2022-11-26 23:59:00','Assignment 6',NULL,NULL,NULL,NULL),(5,8,100,'2022-11-30 23:59:00','2022-11-29 23:59:00','Assignment 8',NULL,NULL,NULL,NULL),(6,10,50,'2022-11-30 12:00:00','2022-11-30 12:00:00','Assignment 4',NULL,NULL,NULL,NULL),(7,10,100,'2022-12-01 23:59:00','2022-12-01 23:59:00','Assignment 5',NULL,NULL,NULL,NULL),(23,8,102,'2022-12-09 21:30:09','2022-12-08 21:30:09','CN_Assignment_7','2022-12-01 21:30:09','<ol><li>You have to implement <strong>Go back N</strong> protocol and <em class=\"ql-font-monospace\"><u>submit it</u></em></li></ol>',NULL,NULL),(24,9,100,'2022-12-15 17:55:50','2022-12-08 17:55:50','SE1','2022-12-03 17:55:50','<p><strong>dsndsdnsmdmnsdnsdnsdmsdnsmdnsmnd</strong></p><p><br></p>',NULL,NULL),(25,10,100,'2022-12-17 18:18:43','2022-12-16 18:18:43','BDA project','2022-12-03 18:18:43','<p>This is gonna be a <strong>project</strong> submission</p><p>Do it <em>asap</em></p><h2><span class=\"ql-font-monospace\">Good Luck</span></h2>',1,0),(27,10,100,'2022-12-23 18:25:12','2022-12-10 18:25:12','BDA project 2','2022-12-03 18:25:12','<p>Do this as well</p>',0,1),(28,10,50,'2022-12-16 19:10:50','2022-12-10 19:10:50','BDA project 3','2022-12-03 19:10:50','<h1>Do this tooo!!!</h1>',1,1),(29,9,75,'2022-12-18 04:59:00','2022-12-09 04:59:00','SE 2','2022-12-03 19:47:42','<p>Do this pleasre</p>',1,0),(30,9,50,'2022-12-11 04:59:00','2022-12-04 04:59:00','SE 5','2022-12-03 19:49:51','<p>Do dsdnsfndmf dfmgmfg</p>',0,1),(31,9,4,'2022-12-03 16:43:08','2022-12-03 16:43:08','','2022-12-03 16:43:12','',0,0),(32,9,75,'2022-12-11 12:00:00','2022-12-10 23:59:00','SE Finals','2022-12-03 17:33:32','<p>Give it!!!!</p>',1,1),(33,9,100,'2022-12-24 17:05:37','2022-12-18 00:05:00','SE Finals 2','2022-12-03 17:40:37','<p>repeat</p>',0,1);
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
  `home_title` varchar(50) DEFAULT NULL,
  `home_description` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`courseid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'Applied Algorithms',NULL,NULL),(2,'Applied Machine Learning',NULL,NULL),(3,'Deep Learning Systems',NULL,NULL),(4,'Introduction to Statistics',NULL,NULL),(5,'Computer Vision',NULL,NULL),(6,'Advanced Database Concepts',NULL,NULL),(7,'Information Visualization',NULL,NULL),(8,'Computer Networks','Computer Networks','<p><strong>To begin the course</strong></p><ol><li>Read the <a href=\"https://iu.instructure.com/courses/2081997/assignments/syllabus\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: blue;\">syllabus</a>&nbsp;- located in the left navigation menu.</li><li><a href=\"https://iu.instructure.com/courses/2081997/external_tools/271583\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: blue;\">Introduce yourself</a></li><li>Familiarize yourself and set up the <a href=\"https://colab.research.google.com/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: blue;\">Google Colab</a> environment (more on this during the first week)</li><li>Install TopHat on your mobile phone</li></ol><p>Download the following textbook(s):</p><p>·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><ul><li class=\"ql-indent-1\">Jure Leskovec, Anand Rajaraman, Jeff Ullman.&nbsp;(Feb 2020).&nbsp;<a href=\"http://mmds.org/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: blue;\">Mining of Massive Dataset</a>s.&nbsp;3rd Ed.&nbsp;Cambridge University Press.&nbsp;(The book is free to download)</li></ul><p class=\"ql-align-center\"><a href=\"https://iu.instructure.com/courses/2081997/assignments/syllabus\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: rgb(153, 0, 0); color: white;\"><strong>Syllabus</strong></a></p><p class=\"ql-align-center\"><a href=\"https://iu.instructure.com/courses/2081997/assignments/syllabus\" rel=\"noopener noreferrer\" target=\"_blank\"><img src=\"//:0\" alt=\"https://iu.instructure.com/courses/2081997/files/140182363/preview\" height=\"80\" width=\"80\"></a></p><p class=\"ql-align-center\"><strong style=\"background-color: rgb(153, 0, 0); color: white;\">Learn more about</strong></p><p class=\"ql-align-center\"><strong style=\"background-color: rgb(153, 0, 0); color: white;\">the course.</strong></p><p class=\"ql-align-center\"><a href=\"https://iu.instructure.com/courses/2081997/modules\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: rgb(153, 0, 0); color: white;\"><strong>Modules</strong></a></p><p class=\"ql-align-center\"><a href=\"https://iu.instructure.com/courses/2081997/modules\" rel=\"noopener noreferrer\" target=\"_blank\"><img src=\"//:0\" alt=\"https://iu.instructure.com/courses/2081997/files/140182325/preview\" height=\"80\" width=\"80\"></a></p><p class=\"ql-align-center\"><strong style=\"background-color: rgb(153, 0, 0); color: white;\">Explore the</strong></p><p class=\"ql-align-center\"><strong style=\"background-color: rgb(153, 0, 0); color: white;\">course materials.</strong></p><p><strong>Meet your instructor</strong></p><p>My name is Muazzam Siddiqui. I joined the Computer Science department at Luddy School of Informatics, Computing and Engineering as a Senior Lecturer in Fall 2021. I have been teaching computing and data science courses for 12 years. Before joining IU, I was an Associate Professor at King Abdulaziz University, Saudi Arabia.</p><p><strong>Email:</strong> muazsidd@iu.edu</p><p>Please put D351 in the subject line. I usually respond within 24 hours except for weekends</p><p><strong>Phone:</strong>&nbsp;(812) 856 2678</p><p><strong>Office: </strong>Luddy Hall, Room 2024</p><p><strong>Office Hours:</strong> TR 1:15 pm - 2:15 pm or by appointment</p><p><img src=\"//:0\" alt=\"profile.jpg\" height=\"202\" width=\"202\"></p><p><strong>Meet your AI/UIs</strong></p><p>My name is Samardeep Gurudatta. I joined the Luddy School of Informatics, Computing, and Engineering as a graduate student in the Data Science department in Fall 2021.</p><p><strong>Email:</strong> samgurud@iu.edu</p><p><strong>Phone:</strong> (812) 225 4357</p><p><strong>Office: </strong>Luddy Hall - 2nd Floor Open Space near Room 2024 (Room 2014)</p><p><strong>Office Hours:</strong> Thursday: 3:30 pm - 4:30 pm</p><p><br></p><p>&nbsp;</p><p>Hi! I\'m Yashvanth Kumar Guntupalli, a MS CS Graduate student. Feel free to reach out to me in case of any doubts. You can either mail or meet me during my office hours. All the best for the course!</p><p><strong>Email:</strong> <a href=\"mailto:yakguntu@iu.edu\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: blue;\">yakguntu@iu.edu</a></p><p><strong>Phone:&nbsp;</strong>248-819-4949</p><p><strong>Office : </strong>Luddy Hall - 2nd Floor Open Space near Room 2014</p><p><strong>Office Hours:</strong> Wednesday 2 - 3 PM</p><p><br></p><p><strong>How we\'ll learn in this course</strong></p><p>This is an in-person class. The course is divided into Weeks, as listed in the Modules tool. Each module will include:</p><ol><li>in-person lectures</li><li>in-class activities</li><li>quiz</li><li>assignment</li></ol><p>&nbsp;</p>'),(9,'Software Engineering',NULL,NULL),(10,'Big Data Applications',NULL,NULL);
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
INSERT INTO `enrollment` VALUES (6,8,'student'),(6,9,'student'),(6,10,'student');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'vdaiya@iu.edu','Vicky','Daiya','5fa0d6db6dff70a9865960e07fa521f0/c250a4f4c6'),(7,'yakguntu@iu.edu','Yashvanth','Kumar','d2929fb02d030d7a852f23be2c4a1a64/d4cef71f0ab44838a7');
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

-- Dump completed on 2022-12-09 21:01:51
