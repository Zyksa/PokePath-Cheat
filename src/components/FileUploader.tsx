import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface FileUploaderProps {
  onLoadSave: (base64: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function FileUploader({ onLoadSave, isLoading, error }: FileUploaderProps) {
  const { t } = useTranslation();
  const [textInput, setTextInput] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onLoadSave(content);
    };
    reader.readAsText(file);
  }, [onLoadSave]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.txt')) {
      handleFileChange(file);
    }
  }, [handleFileChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  }, [handleFileChange]);

  const handleTextSubmit = useCallback(() => {
    if (textInput.trim()) {
      onLoadSave(textInput.trim());
    }
  }, [textInput, onLoadSave]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header with title and description */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-black gradient-text">
          {t('uploader.title')}
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          {t('uploader.description')}
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground/70 pt-2">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {t('uploader.step1')}
          </span>
          <span className="text-white/20">→</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            {t('uploader.step2')}
          </span>
          <span className="text-white/20">→</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            {t('uploader.step3')}
          </span>
        </div>
      </div>

      {/* Text Input - NOW FIRST */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span>{t('common.pasteHint')}</span>
        </div>
        
        <Textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="eyJhcmVhIjp7InJvdXRlTnVtYmVyIjowLC..."
          className="h-40 max-h-40 bg-black/30 border-white/10 font-mono text-sm resize-none input-glow overflow-auto"
        />

        <Button
          onClick={handleTextSubmit}
          disabled={!textInput.trim() || isLoading}
          className="w-full btn-gradient h-14 text-lg font-bold"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              {t('common.loading')}
            </>
          ) : (
            <>
              <FileText className="w-5 h-5 mr-2" />
              {t('common.editButton')}
            </>
          )}
        </Button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-sm text-muted-foreground">OR</span>
        </div>
      </div>

      {/* File Drop Zone - NOW SECOND */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-primary bg-primary/10 scale-[1.02]'
            : 'border-white/10 hover:border-white/20 hover:bg-white/5'
        }`}
      >
        <input
          type="file"
          accept=".txt"
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            isDragOver ? 'bg-primary/30' : 'bg-white/5'
          }`}>
            <Upload className={`w-8 h-8 transition-colors ${isDragOver ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          
          <div>
            <p className="font-semibold text-lg">{t('common.upload')}</p>
            <p className="text-sm text-muted-foreground mt-1">{t('common.uploadHint')}</p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 animate-fadeIn">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{t(`common.${error}`)}</p>
        </div>
      )}
    </div>
  );
}
