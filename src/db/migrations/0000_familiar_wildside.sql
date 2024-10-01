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
CREATE TABLE `logs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`details` text,
	`userId` bigint unsigned NOT NULL,
	CONSTRAINT `logs_id` PRIMARY KEY(`id`)
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
	`email` varchar(256) NOT NULL,
	`dob` date NOT NULL,
	`matrialStatus` enum('متزوج','أعزب') NOT NULL,
	`age` int,
	`currentDegree` enum('1','2','3','4','5','6','7','8','9','12') NOT NULL,
	`nextDegree` enum('1','2','3','4','5','6','7','8','9','12') NOT NULL,
	`effectiveDate` date NOT NULL,
	`highPostion` boolean NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`tierId` bigint unsigned NOT NULL,
	`postionId` bigint unsigned NOT NULL,
	CONSTRAINT `teachers_id` PRIMARY KEY(`id`),
	CONSTRAINT `teachers_email_unique` UNIQUE(`email`)
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
CREATE TABLE `tiers` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`durationId` bigint unsigned NOT NULL,
	CONSTRAINT `tiers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `durations` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`duration` varchar(256) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `durations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_roles_id_fk` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `logs` ADD CONSTRAINT `logs_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_tierId_tiers_id_fk` FOREIGN KEY (`tierId`) REFERENCES `tiers`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_postionId_positions_id_fk` FOREIGN KEY (`postionId`) REFERENCES `positions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tiers` ADD CONSTRAINT `tiers_durationId_durations_id_fk` FOREIGN KEY (`durationId`) REFERENCES `durations`(`id`) ON DELETE no action ON UPDATE no action;