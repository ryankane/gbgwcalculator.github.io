SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `gbgw` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `gbgw`;

DROP TABLE IF EXISTS `ai_range`;
CREATE TABLE `ai_range` (
    `id` int(11) NOT NULL,
    `value` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `ai_range` (`id`, `value`) VALUES
(1, 'Short'),
(2, 'Mid'),
(3, 'Long');

DROP TABLE IF EXISTS `ai_priority`;
CREATE TABLE `ai_priority` (
   `id` int(11) NOT NULL,
   `value` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `ai_priority` (`id`, `value`) VALUES
(1, 'Solo'),
(2, 'Balanced'),
(3, 'Support');

DROP TABLE IF EXISTS `attribute`;
CREATE TABLE `attribute` (
    `id` int(11) NOT NULL,
    `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `attribute` (`id`, `name`) VALUES
(1, 'Power'),
(2, 'Technique'),
(3, 'Speed');

DROP TABLE IF EXISTS `event`;
CREATE TABLE `event` (
    `id` int(11) NOT NULL,
    `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    `exchange` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    `blueprints` tinyint(1) NOT NULL,
    `start_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `ex_category`;
CREATE TABLE `ex_category` (
    `id` int(11) NOT NULL,
    `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `ex_category` (`id`, `name`) VALUES
(1, 'Beam Shot'),
(2, 'Physical Shot'),
(3, 'Beam Melee'),
(4, 'Physical Melee'),
(5, 'Buff'),
(6, 'Awakening'),
(7, 'Debuff'),
(8, 'Recovery');

DROP TABLE IF EXISTS `ex_skill`;
CREATE TABLE `ex_skill` (
    `id` int(11) NOT NULL,
    `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    `description` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    `ex_category_id` int(11) NOT NULL,
    `pierce` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `power` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `duration` int(11) DEFAULT NULL,
    `magazine` int(11) DEFAULT NULL,
    `cooldown` int(11) NOT NULL,
    `cooldown_initial` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `job_license`;
CREATE TABLE `job_license` (
    `id` int(11) NOT NULL,
    `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `job_license` (`id`, `name`) VALUES
(1, 'All-Rounder'),
(2, 'Defender'),
(3, 'In-Fighter'),
(4, 'Out-Fighter'),
(5, 'Middle-Shooter'),
(6, 'Long-Shooter'),
(7, 'Supporter');

DROP TABLE IF EXISTS `part`;
CREATE TABLE `part` (
    `id` int(11) NOT NULL,
    `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    `collection_id` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `unit_id` int(11) DEFAULT NULL,
    `part_type_id` int(11) NOT NULL,
    `part_augment_type_id` int(11) DEFAULT NULL,
    `rarity` int(11) NOT NULL,
    `attribute_id` int(11) NOT NULL,
    `word_tag_1_id` int(11) NOT NULL,
    `word_tag_2_id` int(11) NOT NULL,
    `armor` int(11) NOT NULL,
    `melee_attack` int(11) NOT NULL,
    `shot_attack` int(11) NOT NULL,
    `melee_defense` int(11) NOT NULL,
    `shot_defense` int(11) NOT NULL,
    `beam_resistance` int(11) NOT NULL,
    `physical_resistance` int(11) NOT NULL,
    `ex_skill_id` int(11) DEFAULT NULL,
    `trait` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `weapon_type_id` int(11) DEFAULT NULL,
    `weapon_category_id` int(11) DEFAULT NULL,
    `notes` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `part_type`;
CREATE TABLE `part_type` (
    `id` int(11) NOT NULL,
    `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `part_type` (`id`, `name`) VALUES
(1, 'Head'),
(2, 'Body'),
(3, 'Arms'),
(4, 'Legs'),
(5, 'Back'),
(6, 'Shield'),
(7, 'Melee'),
(8, 'Ranged'),
(9, 'Pilot');

DROP TABLE IF EXISTS `pilot`;
CREATE TABLE `pilot` (
    `id` int(11) NOT NULL,
    `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    `series_id` int(11) NOT NULL,
    `issue` int(11) NOT NULL,
    `name_japanese` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `rarity` int(11) NOT NULL,
    `attribute_id` int(11) NOT NULL,
    `word_tag_1_id` int(11) NOT NULL,
    `word_tag_2_id` int(11) NOT NULL,
    `armor` int(11) NOT NULL,
    `melee_attack` int(11) NOT NULL,
    `shot_attack` int(11) NOT NULL,
    `melee_defense` int(11) NOT NULL,
    `shot_defense` int(11) NOT NULL,
    `beam_resistance` int(11) NOT NULL,
    `physical_resistance` int(11) NOT NULL,
    `trait` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    `job_license_id` int(11) NOT NULL,
    `ai_range_id` int(11) NOT NULL,
    `ai_priority_id` int(11) NOT NULL,
    `obtained_capsule` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `obtained_exchange` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `release_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `series`;
CREATE TABLE `series` (
    `id` int(11) NOT NULL,
    `title` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    `alternate` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `unit`;
CREATE TABLE `unit` (
    `id` int(11) NOT NULL,
    `model` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    `subname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `series_id` int(11) NOT NULL,
    `issue` int(11) DEFAULT NULL,
    `name_japanese` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `rarity` int(11) DEFAULT NULL,
    `attribute_id` int(11) DEFAULT NULL,
    `marks` int(11) DEFAULT NULL,
    `obtained_capsule` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `obtained_exchange` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `obtained_banner` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `obtained_sokai` tinyint(1) NOT NULL,
    `release_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `weapon_category`;
CREATE TABLE `weapon_category` (
    `id` int(11) NOT NULL,
    `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `weapon_category` (`id`, `name`) VALUES
(1, 'Axe'),
(2, 'Saber'),
(3, 'Module'),
(4, 'Dual Sabers'),
(5, 'Blade'),
(6, 'Lance'),
(7, 'Whip'),
(8, 'Rifle'),
(9, 'Machine Gun'),
(10, 'Long Rifle'),
(11, 'Gatling Gun'),
(12, 'Bazooka');

DROP TABLE IF EXISTS `weapon_type`;
CREATE TABLE `weapon_type` (
    `id` int(11) NOT NULL,
    `name` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `weapon_type` (`id`, `name`) VALUES
(1, 'Beam'),
(2, 'Physical');

DROP TABLE IF EXISTS `word_tag`;
CREATE TABLE `word_tag` (
    `id` int(11) NOT NULL,
    `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `word_tag` (`id`, `name`) VALUES
(1, 'Protag.'),
(2, 'Mass P.'),
(3, 'Ace Excl.'),
(4, 'Amphib.'),
(5, 'Commander'),
(6, 'Close Combat'),
(7, 'Mid-Range'),
(8, 'Long-Range'),
(9, 'High Mobility'),
(10, 'High Firepower'),
(11, 'Heavy Armor'),
(12, 'Transformer'),
(13, 'Gundam Type'),
(14, 'Mobile Fighter'),
(15, 'Support Type'),
(16, 'Federation'),
(17, 'Zeon'),
(18, 'Zaku Type'),
(19, 'GM Type'),
(20, 'For Space'),
(21, 'For Desert'),
(22, 'For Tundra'),
(23, 'For Forest'),
(24, 'For Urban Area'),
(25, 'For Base'),
(26, 'For Computers');

-- Indexes

ALTER TABLE `ai_range`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `ai_priority`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `attribute`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `event`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `ex_category`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `ex_skill`
    ADD PRIMARY KEY (`id`),
    ADD KEY `FK_ExSkillCategoryId` (`ex_category_id`);

ALTER TABLE `job_license`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `part`
    ADD PRIMARY KEY (`id`),
    ADD KEY `FK_PartAttributeId` (`attribute_id`),
    ADD KEY `FK_PartExSkillId` (`ex_skill_id`),
    ADD KEY `FK_PartPartAugmentTypeId` (`part_augment_type_id`),
    ADD KEY `FK_PartPartTypeId` (`part_type_id`),
    ADD KEY `FK_PartUnitId` (`unit_id`),
    ADD KEY `FK_PartWeaponCategoryId` (`weapon_category_id`),
    ADD KEY `FK_PartWeaponTypeId` (`weapon_type_id`),
    ADD KEY `FK_PartWordTag1Id` (`word_tag_1_id`),
    ADD KEY `FK_PartWordTag2Id` (`word_tag_2_id`);

ALTER TABLE `part_type`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `pilot`
    ADD PRIMARY KEY (`id`),
    ADD KEY `FK_PilotAiType1Id` (`ai_range_id`),
    ADD KEY `FK_PilotAiType2Id` (`ai_priority_id`),
    ADD KEY `FK_PilotAttributeId` (`attribute_id`),
    ADD KEY `FK_PilotJobLicenseId` (`job_license_id`),
    ADD KEY `FK_PilotSeriesId` (`series_id`),
    ADD KEY `FK_PilotWordTag1Id` (`word_tag_1_id`),
    ADD KEY `FK_PilotWordTag2Id` (`word_tag_2_id`);

ALTER TABLE `series`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `unit`
    ADD PRIMARY KEY (`id`),
    ADD KEY `FK_UnitAttributeId` (`attribute_id`),
    ADD KEY `FK_UnitSeriesId` (`series_id`);

-- Auto-Increment

ALTER TABLE `weapon_category`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `weapon_type`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `word_tag`
    ADD PRIMARY KEY (`id`);

ALTER TABLE `ai_range`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `ai_priority`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `attribute`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `ex_category`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `ex_skill`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1; -- See: data-only.sql

ALTER TABLE `job_license`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `part`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1; -- See: data-only.sql

ALTER TABLE `part_type`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `pilot`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1; -- See: data-only.sql

ALTER TABLE `series`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1; -- See: data-only.sql

ALTER TABLE `unit`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1; -- See: data-only.sql

ALTER TABLE `weapon_category`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

ALTER TABLE `weapon_type`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `word_tag`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

-- Foreign Key Constraints

ALTER TABLE `ex_skill`
    ADD CONSTRAINT `FK_ExSkillCategoryId` FOREIGN KEY (`ex_category_id`) REFERENCES `ex_category` (`id`);

ALTER TABLE `part`
    ADD CONSTRAINT `FK_PartAttributeId` FOREIGN KEY (`attribute_id`) REFERENCES `attribute` (`id`),
    ADD CONSTRAINT `FK_PartExSkillId` FOREIGN KEY (`ex_skill_id`) REFERENCES `ex_skill` (`id`),
    ADD CONSTRAINT `FK_PartPartAugmentTypeId` FOREIGN KEY (`part_augment_type_id`) REFERENCES `part_type` (`id`),
    ADD CONSTRAINT `FK_PartPartTypeId` FOREIGN KEY (`part_type_id`) REFERENCES `part_type` (`id`),
    ADD CONSTRAINT `FK_PartUnitId` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`id`),
    ADD CONSTRAINT `FK_PartWeaponCategoryId` FOREIGN KEY (`weapon_category_id`) REFERENCES `weapon_category` (`id`),
    ADD CONSTRAINT `FK_PartWeaponTypeId` FOREIGN KEY (`weapon_type_id`) REFERENCES `weapon_type` (`id`),
    ADD CONSTRAINT `FK_PartWordTag1Id` FOREIGN KEY (`word_tag_1_id`) REFERENCES `word_tag` (`id`),
    ADD CONSTRAINT `FK_PartWordTag2Id` FOREIGN KEY (`word_tag_2_id`) REFERENCES `word_tag` (`id`);

ALTER TABLE `pilot`
    ADD CONSTRAINT `FK_PilotAiRangeId` FOREIGN KEY (`ai_range_id`) REFERENCES `ai_range` (`id`),
    ADD CONSTRAINT `FK_PilotAiPriorityId` FOREIGN KEY (`ai_priority_id`) REFERENCES `ai_priority` (`id`),
    ADD CONSTRAINT `FK_PilotAttributeId` FOREIGN KEY (`attribute_id`) REFERENCES `attribute` (`id`),
    ADD CONSTRAINT `FK_PilotJobLicenseId` FOREIGN KEY (`job_license_id`) REFERENCES `job_license` (`id`),
    ADD CONSTRAINT `FK_PilotSeriesId` FOREIGN KEY (`series_id`) REFERENCES `series` (`id`),
    ADD CONSTRAINT `FK_PilotWordTag1Id` FOREIGN KEY (`word_tag_1_id`) REFERENCES `word_tag` (`id`),
    ADD CONSTRAINT `FK_PilotWordTag2Id` FOREIGN KEY (`word_tag_2_id`) REFERENCES `word_tag` (`id`);

ALTER TABLE `unit`
    ADD CONSTRAINT `FK_UnitAttributeId` FOREIGN KEY (`attribute_id`) REFERENCES `attribute` (`id`),
    ADD CONSTRAINT `FK_UnitSeriesId` FOREIGN KEY (`series_id`) REFERENCES `series` (`id`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
