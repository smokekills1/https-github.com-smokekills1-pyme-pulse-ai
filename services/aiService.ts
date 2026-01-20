
import { GoogleGenAI, Type } from "@google/genai";
import { MarketingOptions, MarketingVariant } from "../types";

// Inicialización del cliente de IA. 
// La variable process.env.API_KEY ahora es inyectada por Vite.
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateMarketingCopy = async (options: MarketingOptions): Promise<MarketingVariant[]> => {
  const ai = getAiClient();
  const prompt = `Actúa como Experto en Marketing Digital. 
  Genera 3 variantes de anuncios persuasivos para ${options.platform}.
  PRODUCTO: ${options.product}
  TARGET: ${options.target}
  TONO: ${options.tone}
  Devuelve un JSON con 'text' e 'imagePrompt'.`;

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
              text: { type: Type.STRING },
              imagePrompt: { type: Type.STRING }
            },
            required: ["text", "imagePrompt"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    throw new Error("Error en el servicio de Marketing.");
  }
};

export const respondToReview = async (review: string, business: string, tone: string = 'Profesional'): Promise<string> => {
  const ai = getAiClient();
  const prompt = `Responde a esta reseña para la empresa "${business}": "${review}". Tono ${tone}. Máximo 60 palabras.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });
    return response.text || "Gracias por su feedback.";
  } catch (error) {
    throw new Error("Error al procesar la reseña.");
  }
};

export const analyzeBusinessIdea = async (idea: string): Promise<string> => {
  // Validación mínima de seguridad
  if (idea.trim().length < 3) {
    throw new Error("Por favor, escriba al menos una palabra clave (ej: 'Zapatería online').");
  }

  const ai = getAiClient();
  
  // Hemos simplificado el prompt para que la IA no se abrume si el input es corto
  const prompt = `Como Consultor Senior, analiza esta idea de negocio: "${idea}".
  
  Estructura brevemente:
  1. VIABILIDAD: ¿Es buena idea?
  2. DAFO RÁPIDO: Puntos clave.
  3. PRIMER PASO: ¿Por dónde empezar hoy?
  
  Si la idea es muy breve, expande tú las posibilidades basándote en el mercado español actual.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        temperature: 0.9, // Más creatividad para que "rellene" huecos si el input es corto
        systemInstruction: "Eres un consultor de negocios proactivo. Si el cliente te da poca información, usa tu inteligencia para proponer un escenario probable y ayudarle a empezar."
      }
    });

    return response.text || "No se pudo generar el análisis. Intente dar más contexto.";
  } catch (error) {
    console.error("Error Analysis:", error);
    throw new Error("El modelo está ocupado o la idea es ambigua. Intente con otra frase.");
  }
};
