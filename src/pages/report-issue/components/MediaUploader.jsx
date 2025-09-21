import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MediaUploader = ({ 
  files, 
  onFilesChange, 
  language = 'en',
  error = null 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const maxFiles = 5;
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e?.dataTransfer?.files);
    processFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e?.target?.files);
    processFiles(selectedFiles);
  };

  const processFiles = (newFiles) => {
    const validFiles = newFiles?.filter(file => {
      const isValidType = file?.type?.startsWith('image/') || file?.type?.startsWith('video/');
      const isValidSize = file?.size <= maxFileSize;
      return isValidType && isValidSize;
    });

    if (files?.length + validFiles?.length > maxFiles) {
      alert(
        language === 'en' 
          ? `Maximum ${maxFiles} files allowed`
          : `अधिकतम ${maxFiles} फाइलों की अनुमति है`
      );
      return;
    }

    const filesWithPreview = validFiles?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file?.name,
      size: file?.size,
      type: file?.type,
      preview: file?.type?.startsWith('image/') ? URL.createObjectURL(file) : null,
      uploadProgress: 0
    }));

    // Simulate upload progress
    filesWithPreview?.forEach(fileObj => {
      simulateUpload(fileObj?.id);
    });

    onFilesChange([...files, ...filesWithPreview]);
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      
      setUploadProgress(prev => ({
        ...prev,
        [fileId]: Math.round(progress)
      }));
    }, 200);
  };

  const removeFile = (fileId) => {
    const updatedFiles = files?.filter(file => file?.id !== fileId);
    onFilesChange(updatedFiles);
    
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress?.[fileId];
      return newProgress;
    });
  };

  const capturePhoto = () => {
    // In a real app, this would open camera
    fileInputRef?.current?.click();
  };

  const captureVideo = () => {
    // In a real app, this would open camera for video
    videoInputRef?.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {language === 'en' ? 'Add Photos & Videos' : 'फोटो और वीडियो जोड़ें'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {language === 'en' ?'Visual evidence helps us understand and resolve issues faster' :'दृश्य साक्ष्य हमें समस्याओं को समझने और तेजी से हल करने में मदद करता है'
          }
        </p>
      </div>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200
          ${dragActive 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={24} className="text-primary" />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              {language === 'en' ?'Drag and drop files here, or click to select' :'फाइलों को यहाँ खींचें और छोड़ें, या चुनने के लिए क्लिक करें'
              }
            </p>
            <p className="text-xs text-muted-foreground">
              {language === 'en' 
                ? `Maximum ${maxFiles} files, up to 10MB each`
                : `अधिकतम ${maxFiles} फाइलें, प्रत्येक 10MB तक`
              }
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef?.current?.click()}
              iconName="Image"
              iconPosition="left"
            >
              {language === 'en' ? 'Choose Photos' : 'फोटो चुनें'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={capturePhoto}
              iconName="Camera"
              iconPosition="left"
            >
              {language === 'en' ? 'Take Photo' : 'फोटो लें'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={captureVideo}
              iconName="Video"
              iconPosition="left"
            >
              {language === 'en' ? 'Record Video' : 'वीडियो रिकॉर्ड करें'}
            </Button>
          </div>
        </div>
      </div>
      {/* File List */}
      {files?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">
            {language === 'en' ? 'Uploaded Files' : 'अपलोड की गई फाइलें'} ({files?.length}/{maxFiles})
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {files?.map((fileObj) => (
              <div key={fileObj?.id} className="bg-card border border-border rounded-lg p-3">
                <div className="flex items-start space-x-3">
                  {/* File Preview */}
                  <div className="flex-shrink-0">
                    {fileObj?.preview ? (
                      <img
                        src={fileObj?.preview}
                        alt={fileObj?.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                        <Icon 
                          name={fileObj?.type?.startsWith('video/') ? 'Video' : 'File'} 
                          size={20} 
                          className="text-muted-foreground" 
                        />
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {fileObj?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(fileObj?.size)}
                    </p>
                    
                    {/* Upload Progress */}
                    {uploadProgress?.[fileObj?.id] !== undefined && uploadProgress?.[fileObj?.id] < 100 && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-muted rounded-full h-1.5">
                            <div 
                              className="bg-primary h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress?.[fileObj?.id]}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {uploadProgress?.[fileObj?.id]}%
                          </span>
                        </div>
                      </div>
                    )}

                    {uploadProgress?.[fileObj?.id] === 100 && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon name="CheckCircle" size={12} className="text-success" />
                        <span className="text-xs text-success">
                          {language === 'en' ? 'Uploaded' : 'अपलोड हो गया'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFile(fileObj?.id)}
                    className="flex-shrink-0 p-1 text-muted-foreground hover:text-error civic-hover civic-focus rounded"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && (
        <div className="flex items-center space-x-2 text-error text-sm">
          <Icon name="AlertCircle" size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;