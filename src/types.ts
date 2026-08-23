export interface SlideData {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  category: string;
  pngPath: string;
  svgPath: string;
  description: string;
  kidAnalogy: {
    title: string;
    concept: string;
    example: string;
    emoji: string;
  };
}

export interface DomainItem {
  id: string;
  name: string;
  category: 'Tech' | 'Finance' | 'Lifestyle' | 'Enterprise' | 'Industrial';
  active?: boolean;
}

export interface QAItem {
  id: string;
  name: string;
  description: string;
  category: 'Visual' | 'Technical' | 'Process';
  checked: boolean;
}

export interface ColorToken {
  name: string;
  hex: string;
  role: string;
  textColor: string;
  cmykFallback?: string;
}

export interface TypeScale {
  role: string;
  spec: string;
  sample: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  weight: string;
}
