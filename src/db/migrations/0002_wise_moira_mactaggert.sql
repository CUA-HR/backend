ALTER TABLE `teachers` RENAME COLUMN `postionId` TO `positionId`;--> statement-breakpoint
ALTER TABLE `teachers` DROP FOREIGN KEY `teachers_postionId_positions_id_fk`;
--> statement-breakpoint
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_positionId_positions_id_fk` FOREIGN KEY (`positionId`) REFERENCES `positions`(`id`) ON DELETE no action ON UPDATE no action;