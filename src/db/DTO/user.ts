import { t } from 'elysia'

export const SignUpDTO = t.Object({
    openid: t.Optional(t.String()),
    student_id: t.Optional(t.String({ minLength: 1 })),
    teacher_id: t.Optional(t.String({ minLength: 1 })),
    avatar: t.Optional(t.String()),
    username: t.String({
        minLength: 1,
        maxLength: 16
    }),
    password: t.String({ 
        minLength: 6,
        maxLength: 16
    }),
    faculty: t.String(),
    major: t.String(),
    grade: t.Number(),
    identity: t.Union([
        t.Literal("本科生"), t.Literal("硕士生"), t.Literal("博士生"), t.Literal("教职工")
    ]),
})