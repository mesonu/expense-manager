import { PrismaClient, DeviceType } from '@prisma/client';
import { hash, compare } from 'bcryptjs';
import { generateToken, sendVerificationEmail } from '@/lib/utils/auth';

const prisma = new PrismaClient();

export const authService = {
  async createUser({ name, email, mobile, password }: { name: string; email: string; mobile: string; password: string }) {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { mobile }]
      }
    });
    if (existingUser) {
      throw new Error('Email or mobile already in use');
    }
    const hashedPassword = await hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, mobile, password: hashedPassword }
    });
    return user;
  },

  async verifyCredentials(identifier: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { mobile: identifier }]
      }
    });
    if (!user || !user.password || !(await compare(password, user.password))) {
      return null;
    }
    return user;
  },

  async generateEmailOTP(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const otp = await generateToken(6);
    const hashedOTP = await hash(otp, 12);

    await prisma.verification.create({
      data: {
        userId: user.id,
        token: hashedOTP,
        type: 'EMAIL',
        expires: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
      }
    });

    await sendVerificationEmail(email, otp);
    return true;
  },

  async verifyEmailOTP(email: string, otp: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const verification = await prisma.verification.findFirst({
      where: { userId: user.id, type: 'EMAIL', expires: { gt: new Date() } }
    });
    if (!verification || !(await compare(otp, verification.token))) {
      return null;
    }

    await prisma.verification.delete({ where: { id: verification.id } });
    return user;
  },

  async updatePassword(userId: string, newPassword: string) {
    const hashedPassword = await hash(newPassword, 12);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });
  },

  async socialLogin({ provider, providerAccountId, name, email, mobile, type }: { provider: string; providerAccountId: string; name: string; email: string; mobile: string, type:string }) {
    let user = await prisma.user.findFirst({
      where: { OR: [{ email }, { mobile }] }
    });
    if (!user) {
      user = await prisma.user.create({
        data: { name, email, mobile }
      });
    }
    await prisma.account.upsert({
      where: { provider_providerAccountId: { provider, providerAccountId } },
      update: {},
      create: { userId: user.id, provider, providerAccountId, type }
    });
    return user;
  },

  async updateDeviceToken(userId: string, token: string, deviceId: string, deviceType: DeviceType) {
    return prisma.deviceToken.upsert({
      where: { token },
      update: { lastUsedAt: new Date(), deviceType },
      create: { token, deviceId, userId, deviceType }
    });
  }
};