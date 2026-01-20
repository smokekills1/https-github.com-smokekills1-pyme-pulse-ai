
import { GoogleGenAI, Type } from "@google/genai";
import { MarketingOptions, MarketingVariant } from "../types";

// Inicialización del cliente de IA asegurando que lea la clave inyectada por Vite
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  return new GoogleGenAI({ apiKey: apiKey as string });
};

export const generateMarketingCopy = async (options: MarketingOptions): Promise<MarketingVariant[]> => {
  const ai = getAiClient();
  const prompt = `Actúa como Experto en Marketing Digital. 
  Genera 3 variantes de anuncios persuasivos para ${options.platform}.
  PRODUCTO: ${options.product}
  TARGET: ${options.target}
  TONO: ${options.tone}
  Devuelve JSON con 'text' e 'imagePrompt'.`;

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
  } catch (error: any) {
    console.error("Error Marketing:", error);
    throw new Error(`Error de IA: ${error.message || "Fallo de comunicación con Gemini"}`);
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
  } catch (error: any) {
    console.error("Error Review:", error);
    throw new Error(`Error al responder: ${error.message}`);
  }
};

export const analyzeBusinessIdea = async (idea: string): Promise<string> => {
  if (idea.trim().length < 3) {
    throw new Error("Por favor, describa su idea con más detalle.");
  }

  const ai = getAiClient();
  const prompt = `Como Consultor Senior, analiza esta idea de negocio: "${idea}".
  
  Estructura brevemente:
  1. VIABILIDAD: ¿Es buena idea?
  2. DAFO RÁPIDO: Puntos clave.
  3. PRIMER PASO: ¿Por dónde empezar hoy?`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        temperature: 0.8,
        systemInstruction: "Eres un consultor proactivo. Si el usuario da poca información, expande tú las posibilidades basándote en el mercado actual."
      }
    });

    return response.text || "No se pudo generar el análisis.";
  } catch (error: any) {
    console.error("Error Analysis:", error);
    if (error.message?.includes("429")) {
      throw new Error("Límite de cuota excedido. Por favor, inténtelo de nuevo en un minuto.");
    }
    throw new Error(`Error Estratégico: ${error.message}`);
  }
};
