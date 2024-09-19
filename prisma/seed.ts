import { PrismaClient } from '@prisma/client';
import { PasswordService } from '../src/auth/password.service';

const prisma = new PrismaClient();
async function main() {
  const passwordService = new PasswordService();
  const password = 'admin1234';
  const salt = passwordService.getSalt();
  const hash = passwordService.getHash(password, salt);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.ru' },
    update: {},
    create: {
      email: 'admin@admin.ru',
      salt,
      hash,
      role: ['ADMIN'],
    },
  });
  console.log(admin);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
