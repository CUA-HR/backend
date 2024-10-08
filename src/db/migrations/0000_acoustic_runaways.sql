CREATE TABLE `durations` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`duration` varchar(256) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `durations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `logs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`details` text,
	`userId` bigint unsigned NOT NULL,
	CONSTRAINT `logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `positions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `positions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `teachers` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`firstname` varchar(256) NOT NULL,
	`lastname` varchar(256) NOT NULL,
	`email` varchar(256),
	`dob` date,
	`matrialStatus` enum('متزوج','أعزب'),
	`age` int,
	`highPostion` boolean NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`tierId` bigint unsigned NOT NULL,
	`positionId` bigint unsigned NOT NULL,
	CONSTRAINT `teachers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `teachersHistory` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`currentDegree` enum('0','1','2','3','4','5','6','7','8','9','12') NOT NULL,
	`nextDegree` enum('0','1','2','3','4','5','6','7','8','9','12') NOT NULL,
	`effectiveDate` date NOT NULL,
	`highPostion` boolean NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`teacherId` bigint unsigned NOT NULL,
	CONSTRAINT `teachersHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tiers` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`durationId` bigint unsigned NOT NULL,
	CONSTRAINT `tiers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`roleId` bigint unsigned NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `logs` ADD CONSTRAINT `logs_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_tierId_tiers_id_fk` FOREIGN KEY (`tierId`) REFERENCES `tiers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_positionId_positions_id_fk` FOREIGN KEY (`positionId`) REFERENCES `positions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teachersHistory` ADD CONSTRAINT `teachersHistory_teacherId_teachers_id_fk` FOREIGN KEY (`teacherId`) REFERENCES `teachers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tiers` ADD CONSTRAINT `tiers_durationId_durations_id_fk` FOREIGN KEY (`durationId`) REFERENCES `durations`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_roles_id_fk` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE no action ON UPDATE no action;