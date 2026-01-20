
// Este archivo ya no es necesario. 
// La lógica de IA se ha movido directamente a services/aiService.ts para mayor fiabilidad.
export default async function handler(req: any, res: any) {
  return res.status(410).json({ error: "Endpoint migrado al cliente." });
}
