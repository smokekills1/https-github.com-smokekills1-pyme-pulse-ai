
import { GoogleGenAI, Type } from "@google/genai";
import { MarketingOptions, MarketingVariant } from "../types";

// Inicialización del cliente de IA usando la variable de entorno del sistema
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

/**
 * Genera copys de marketing estructurados usando JSON Schema para máxima fiabilidad.
 */
export const generateMarketingCopy = async (options: MarketingOptions): Promise<MarketingVariant[]> => {
  const ai = getAiClient();
  const prompt = `Actúa como un Experto en Marketing Digital para PYMES. 
  Genera 3 variantes de anuncios altamente persuasivos para la plataforma ${options.platform}.
  PRODUCTO/SERVICIO: ${options.product}
  PÚBLICO OBJETIVO: ${options.target}
  TONO DE VOZ: ${options.tone}
  
  Para cada variante, incluye el texto del anuncio y un "imagePrompt" detallado para generar la imagen que lo acompaña.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING, description: "El cuerpo de texto del anuncio." },
              imagePrompt: { type: Type.STRING, description: "Prompt para generar la imagen descriptiva." }
            },
            required: ["text", "imagePrompt"]
          }
        }
      }
    });

    const result = JSON.parse(response.text || "[]");
    return result;
  } catch (error) {
    console.error("Error en Marketing AI:", error);
    throw new Error("No se pudo generar la campaña. Verifique su conexión.");
  }
};

/**
 * Responde a reseñas de clientes manteniendo el tono de marca.
 */
export const respondToReview = async (review: string, business: string, tone: string = 'Profesional'): Promise<string> => {
  const ai = getAiClient();
  const prompt = `Eres el Director de Atención al Cliente de "${business}". 
  Responde de forma impecable a la siguiente reseña: "${review}".
  TONO: ${tone}. 
  REGLAS: Máximo 80 palabras, castellano de España, profesional y empático. No uses emojis.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    return response.text || "Gracias por su comentario. Estamos trabajando para mejorar.";
  } catch (error) {
    console.error("Error en Review AI:", error);
    throw new Error("Error al procesar la respuesta a la reseña.");
  }
};

/**
 * Realiza un análisis estratégico profundo usando el modelo Pro con capacidades de razonamiento.
 */
export const analyzeBusinessIdea = async (idea: string): Promise<string> => {
  const ai = getAiClient();
  const prompt = `Realiza una auditoría estratégica integral para la siguiente propuesta de negocio: "${idea}".
  Debes incluir:
  1. Diagnóstico de Viabilidad.
  2. Análisis DAFO detallado.
  3. 3 Estrategias de Crecimiento Prioritarias.
  4. Hoja de ruta (Next Steps) a 6 meses.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        thinkingConfig: { thinkingBudget: 4000 },
        systemInstruction: "Eres un Consultor Estratégico de alto nivel. Tu lenguaje es sobrio, técnico y directo. Estructura el informe con secciones claras y numeradas. Usa castellano de España. Evita el uso de asteriscos innecesarios en el texto final."
      }
    });

    return response.text || "No se pudo generar el análisis detallado.";
  } catch (error) {
    console.error("Error en Analysis AI:", error);
    throw new Error("El análisis estratégico requiere más tiempo o recursos. Intente simplificar la descripción.");
  }
};
