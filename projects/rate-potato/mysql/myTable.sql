-- Host: localhost:3306
-- Generation Time: Sep 25, 2016 at 10:48 PM
-- Server version: 5.6.33
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `tblreview` (
  `id` int(1000) NOT NULL AUTO_INCREMENT,
  `rating` int(5) NOT NULL,
  `first` varchar(30) NOT NULL,
  `last` varchar(30) NOT NULL,
  `comment` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `tblreview` (`id`, `rating`, `first`, `last`, `comment`) VALUES
(1, 2, 'jordan', 'nicholson', 'Wow what a cool potato')
