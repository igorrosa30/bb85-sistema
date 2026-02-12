import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Verificar se já existe um admin
    const existingAdmin = await prisma.User.findFirst({
        where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
        console.log('✅ Admin user already exists:', existingAdmin.email);
        return;
    }

    // Criar senha hash
    const hashedPassword = await bcrypt.hash('Admin@BB85!2026', 10);

    // Criar usuário admin
    const admin = await prisma.user.create({
        data: {
            name: 'Administrador Master',
            email: 'admin@bb85.com',
            password: hashedPassword,
            role: 'ADMIN'
        }
    });

    console.log('✅ Admin user created successfully!');
    console.log('==================================');
    console.log('Email: admin@bb85.com');
    console.log('Senha: Admin@BB85!2026');
    console.log('==================================');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
