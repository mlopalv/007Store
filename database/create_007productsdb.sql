-- MySQL Script generated by MySQL Workbench
-- Sat Sep  9 17:58:01 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema 007storedb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `007storedb` ;

-- -----------------------------------------------------
-- Schema 007storedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `007storedb` DEFAULT CHARACTER SET utf8 ;
USE `007storedb` ;

-- -----------------------------------------------------
-- Table `007storedb`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `007storedb`.`categories` ;

CREATE TABLE IF NOT EXISTS `007storedb`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `007storedb`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `007storedb`.`products` ;

CREATE TABLE IF NOT EXISTS `007storedb`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(1024) NOT NULL,
  `price` DECIMAL NOT NULL,
  `image_path` VARCHAR(100) NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `category_id_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `007storedb`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `007storedb`.`profiles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `007storedb`.`profiles` ;

CREATE TABLE IF NOT EXISTS `007storedb`.`profiles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `007storedb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `007storedb`.`users` ;

CREATE TABLE IF NOT EXISTS `007storedb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `login_name` VARCHAR(20) NOT NULL,
  `password` VARCHAR(100) NULL,
  `email` VARCHAR(50) NOT NULL,
  `image_path` VARCHAR(100) NULL,
  `profile_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `profile_id_idx` (`profile_id` ASC) VISIBLE,
  CONSTRAINT `profile_id`
    FOREIGN KEY (`profile_id`)
    REFERENCES `007storedb`.`profiles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `007storedb`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `007storedb`.`orders` ;

CREATE TABLE IF NOT EXISTS `007storedb`.`orders` (
  `id` INT NOT NULL,
  `date` VARCHAR(45) NULL,
  `total_amount` DECIMAL NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `007storedb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `007storedb`.`product_order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `007storedb`.`product_order` ;

CREATE TABLE IF NOT EXISTS `007storedb`.`product_order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `order_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `order_id_idx` (`order_id` ASC) VISIBLE,
  INDEX `product_id_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `007storedb`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `order_id`
    FOREIGN KEY (`order_id`)
    REFERENCES `007storedb`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
