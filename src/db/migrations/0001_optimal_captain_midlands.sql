ALTER TABLE `users` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN `updated_at` TO `updatedAt`;--> statement-breakpoint
ALTER TABLE `users` ADD `password` varchar(256) NOT NULL;