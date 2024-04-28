CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`openid` varchar(255),
	`student_id` varchar(255),
	`teacher_id` varchar(255),
	`role` enum('admin','student','teacher') NOT NULL,
	`avatar` varchar(255),
	`username` varchar(24) NOT NULL,
	`password` varchar(128),
	`faculty` varchar(255),
	`major` varchar(255),
	`grade` int,
	`identity` enum('本科生','硕士生','博士生','教职工'),
	`registered_at` varchar(32),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_student_id_unique` UNIQUE(`student_id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `username_idx` UNIQUE(`username`)
);
