import bcrypt from 'bcryptjs'

/**
 * Hash de senha usando bcrypt
 * @param password - Senha em texto plano
 * @returns Hash da senha
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

/**
 * Compara senha em texto plano com hash
 * @param password - Senha em texto plano
 * @param hash - Hash da senha armazenado
 * @returns true se a senha corresponde ao hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

/**
 * Verifica se uma string é um hash bcrypt (para migração)
 * @param str - String a verificar
 * @returns true se parece ser um hash bcrypt
 */
export function isBcryptHash(str: string): boolean {
  // Hash bcrypt sempre começa com $2a$, $2b$ ou $2y$ e tem 60 caracteres
  return /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(str)
}

