ALTER TABLE `users` RENAME COLUMN `registered_at` TO `created_at`;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `password` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` timestamp DEFAULT (now()) NOT NULL;