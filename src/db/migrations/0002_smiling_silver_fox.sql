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
	CONSTRAINT `teachers_id` PRIMARY KEY(`id`),
	CONSTRAINT `teachers_email_unique` UNIQUE(`email`)
);
