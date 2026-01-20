
import { GoogleGenAI, Type } from "@google/genai";
import { MarketingOptions, MarketingVariant } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "") {
    throw new Error("API_KEY no configurada. Por favor, añádela en las variables de entorno de Vercel.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateMarketingCopy = async (options: MarketingOptions): Promise<MarketingVariant[]> => {
  try {
    const ai = getAiClient();
    const prompt = `Actúa como Experto en Marketing Digital. 
    Genera 3 variantes de anuncios persuasivos para ${options.platform}.
    PRODUCTO: ${options.product}
    TARGET: ${options.target}
    TONO: ${options.tone}
    Devuelve estrictamente un array JSON con objetos que tengan 'text' e 'imagePrompt'.`;

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
              text: { type: Type.STRING, description: "El cuerpo del anuncio" },
              imagePrompt: { type: Type.STRING, description: "Sugerencia visual para la IA de imagen" }
            },
            required: ["text", "imagePrompt"]
          }
        }
      }
    });
    
    return JSON.parse(response.text || "[]");
  } catch (error: any) {
    console.error("Error en MarketingTool:", error);
    throw new Error(error.message || "Error al conectar con Gemini");
  }
};

export const respondToReview = async (review: string, business: string, tone: string = 'Profesional'): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `Responde a esta reseña para la empresa "${business}": "${review}". Tono ${tone}. Máximo 60 palabras.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });
    return response.text || "Gracias por su comentario.";
  } catch (error: any) {
    throw new Error(`Error en Reseñas: ${error.message}`);
  }
};

export const analyzeBusinessIdea = async (idea: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `Analiza esta idea de negocio: "${idea}". 
    Estructura: 1. Viabilidad, 2. DAFO, 3. Primeros pasos.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "Análisis no disponible.";
  } catch (error: any) {
    throw new Error(`Error Estratégico: ${error.message}`);
  }
};
