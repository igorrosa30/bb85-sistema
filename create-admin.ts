import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdminUser() {
    try {
        // Verificar se já existe um admin
        const existingAdmin = await prisma.User.findFirst({
            where: { role: 'ADMIN' }
        });

        if (existingAdmin) {
            console.log('✅ Usuário admin já existe!');
            console.log('Email:', existingAdmin.email);
            return;
        }

        // Criar senha hash
        const hashedPassword = await bcrypt.hash('Admin@BB85!2026', 10);

        // Criar usuário admin
        const admin = await prisma.User.create({
            data: {
                name: 'Administrador Master',
                email: 'admin@bb85.com',
                password: hashedPassword,
                role: 'ADMIN'
            }
        });

        console.log('✅ Usuário admin criado com sucesso!');
        console.log('==================================');
        console.log('Email: admin@bb85.com');
        console.log('Senha: Admin@BB85!2026');
        console.log('==================================');
        console.log('⚠️ ATENÇÃO: Altere a senha após o primeiro login!');

    } catch (error) {
        console.error('❌ Erro ao criar admin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminUser();
