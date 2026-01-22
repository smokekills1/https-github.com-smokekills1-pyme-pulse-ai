
import { GoogleGenAI, Type } from "@google/genai";
import { MarketingOptions, MarketingVariant } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "") {
    throw new Error("API_KEY no detectada. Verifica las variables de entorno en Vercel.");
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
              text: { type: Type.STRING },
              imagePrompt: { type: Type.STRING }
            },
            required: ["text", "imagePrompt"]
          }
        }
      }
    });
    
    return JSON.parse(response.text || "[]");
  } catch (error: any) {
    console.error("Error Marketing:", error);
    throw new Error(error.message || "Fallo en motor de marketing.");
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
    const prompt = `Actúa como un Consultor Senior de Estrategia de Negocio. Analiza la siguiente propuesta: "${idea}". 
    Proporciona de forma estructurada:
    1. DIAGNÓSTICO DE VIABILIDAD
    2. ANÁLISIS DAFO (Debilidades, Amenazas, Fortalezas, Oportunidades)
    3. PLAN DE ACCIÓN (3 pasos críticos a seguir ahora mismo).
    Usa un tono profesional, ejecutivo y directo.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });
    return response.text || "El análisis no pudo completarse. Por favor, intente con una descripción más breve.";
  } catch (error: any) {
    console.error("Error Estrategia:", error);
    if (error.message?.includes("resource") || error.message?.includes("quota")) {
      throw new Error("El servidor de IA está saturado temporalmente. Por favor, reintenta en unos segundos.");
    }
    throw new Error(`Error Estratégico: ${error.message}`);
  }
};
