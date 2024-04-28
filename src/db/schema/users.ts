import { 
    mysqlTable, 
    int, 
    uniqueIndex,
    mysqlEnum,
    serial,
    varchar,
    timestamp
} from "drizzle-orm/mysql-core";

export type User = typeof users.$inferSelect; // 查询返回类型
export type NewUser = typeof users.$inferInsert; // 插入类型

export const users = mysqlTable('users', {
    // system information
    id: serial("id").primaryKey(),
    // 微信 openid
    openid: varchar("openid", { length: 255 }),
    // 学生学号
    student_id: varchar("student_id", { length: 255 }).unique(),
    // 教职工 ID
    teacher_id: varchar("teacher_id", { length: 255 }),
    role: mysqlEnum("role", ["superadmin", "admin", "user"]).default("user"),

    // basic information
    avatar: varchar("avatar", { length: 255 }),
    username: varchar("username", { length: 24 }).unique().notNull(),
    password: varchar("password", { length: 128 }).notNull(),
    
    // personal information
    // 所在学院
    faculty: varchar("faculty", { length: 255 }),
    // 专业
    major: varchar("major", { length: 255 }),
    // 年级
    grade: int("grade"),
    // 身份
    identity: mysqlEnum("identity", ["本科生", "硕士生", "博士生", "教职工"]),

    // timestamp
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
    usernameIdx: uniqueIndex("username_idx").on(table.username),
}))