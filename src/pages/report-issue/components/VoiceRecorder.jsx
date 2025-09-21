import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceRecorder = ({ 
  onRecordingComplete, 
  language = 'en',
  disabled = false 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const maxRecordingTime = 300; // 5 minutes

  useEffect(() => {
    return () => {
      if (timerRef?.current) {
        clearInterval(timerRef?.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      // In a real app, this would request microphone permission
      // For demo, we'll simulate recording
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxRecordingTime) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      // Simulate MediaRecorder API
      console.log('Recording started...');
      
    } catch (error) {
      console.error('Error starting recording:', error);
      alert(
        language === 'en' ?'Unable to access microphone. Please check permissions.' :'माइक्रोफ़ोन तक पहुंच नहीं। कृपया अनुमतियां जांचें।'
      );
    }
  };

  const pauseRecording = () => {
    setIsPaused(true);
    if (timerRef?.current) {
      clearInterval(timerRef?.current);
    }
  };

  const resumeRecording = () => {
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= maxRecordingTime) {
          stopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    
    if (timerRef?.current) {
      clearInterval(timerRef?.current);
    }

    // Simulate audio blob creation
    const mockAudioBlob = new Blob(['mock audio data'], { type: 'audio/wav' });
    setAudioBlob(mockAudioBlob);
    
    if (onRecordingComplete) {
      onRecordingComplete({
        blob: mockAudioBlob,
        duration: recordingTime,
        timestamp: new Date()?.toISOString()
      });
    }
  };

  const discardRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    setIsPlaying(false);
  };

  const playRecording = () => {
    if (audioBlob) {
      setIsPlaying(true);
      // Simulate playback
      setTimeout(() => {
        setIsPlaying(false);
      }, Math.min(recordingTime * 1000, 3000));
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getRecordingStatus = () => {
    if (isRecording && isPaused) {
      return language === 'en' ? 'Paused' : 'रोका गया';
    } else if (isRecording) {
      return language === 'en' ? 'Recording...' : 'रिकॉर्डिंग...';
    } else if (audioBlob) {
      return language === 'en' ? 'Recording Complete' : 'रिकॉर्डिंग पूर्ण';
    }
    return language === 'en' ? 'Ready to Record' : 'रिकॉर्ड करने के लिए तैयार';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Mic" size={20} className="text-primary" />
        <h4 className="font-medium text-foreground">
          {language === 'en' ? 'Voice Description' : 'आवाज़ विवरण'}
        </h4>
      </div>

      {/* Recording Status */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          {isRecording && !isPaused && (
            <div className="w-3 h-3 bg-error rounded-full animate-pulse"></div>
          )}
          {isPaused && (
            <div className="w-3 h-3 bg-warning rounded-full"></div>
          )}
          {audioBlob && !isRecording && (
            <div className="w-3 h-3 bg-success rounded-full"></div>
          )}
          <span className="text-sm font-medium text-foreground">
            {getRecordingStatus()}
          </span>
        </div>

        {/* Timer */}
        <div className="text-2xl font-mono font-bold text-foreground mb-1">
          {formatTime(recordingTime)}
        </div>
        
        {recordingTime > 0 && (
          <div className="text-xs text-muted-foreground">
            {language === 'en' ? 'Maximum' : 'अधिकतम'}: {formatTime(maxRecordingTime)}
          </div>
        )}
      </div>

      {/* Recording Controls */}
      <div className="flex justify-center space-x-2 mb-4">
        {!isRecording && !audioBlob && (
          <Button
            variant="default"
            onClick={startRecording}
            disabled={disabled}
            iconName="Mic"
            iconPosition="left"
            className="bg-primary hover:bg-primary/90"
          >
            {language === 'en' ? 'Start Recording' : 'रिकॉर्डिंग शुरू करें'}
          </Button>
        )}

        {isRecording && !isPaused && (
          <>
            <Button
              variant="outline"
              onClick={pauseRecording}
              iconName="Pause"
              size="sm"
            >
              {language === 'en' ? 'Pause' : 'रोकें'}
            </Button>
            <Button
              variant="destructive"
              onClick={stopRecording}
              iconName="Square"
              size="sm"
            >
              {language === 'en' ? 'Stop' : 'बंद करें'}
            </Button>
          </>
        )}

        {isRecording && isPaused && (
          <>
            <Button
              variant="default"
              onClick={resumeRecording}
              iconName="Play"
              size="sm"
            >
              {language === 'en' ? 'Resume' : 'जारी रखें'}
            </Button>
            <Button
              variant="destructive"
              onClick={stopRecording}
              iconName="Square"
              size="sm"
            >
              {language === 'en' ? 'Stop' : 'बंद करें'}
            </Button>
          </>
        )}

        {audioBlob && !isRecording && (
          <>
            <Button
              variant="outline"
              onClick={playRecording}
              disabled={isPlaying}
              iconName={isPlaying ? "Loader2" : "Play"}
              size="sm"
              className={isPlaying ? "animate-spin" : ""}
            >
              {isPlaying 
                ? (language === 'en' ? 'Playing...' : 'चल रहा है...')
                : (language === 'en' ? 'Play' : 'चलाएं')
              }
            </Button>
            <Button
              variant="outline"
              onClick={startRecording}
              iconName="RotateCcw"
              size="sm"
            >
              {language === 'en' ? 'Re-record' : 'फिर से रिकॉर्ड करें'}
            </Button>
            <Button
              variant="destructive"
              onClick={discardRecording}
              iconName="Trash2"
              size="sm"
            >
              {language === 'en' ? 'Delete' : 'हटाएं'}
            </Button>
          </>
        )}
      </div>

      {/* Recording Tips */}
      <div className="text-xs text-muted-foreground text-center space-y-1">
        <p>
          {language === 'en' ?'Speak clearly and describe the issue in detail' :'स्पष्ट रूप से बोलें और समस्या का विस्तार से वर्णन करें'
          }
        </p>
        {recordingTime > 0 && recordingTime < 10 && (
          <p className="text-warning">
            {language === 'en' ?'Try to record for at least 10 seconds' :'कम से कम 10 सेकंड के लिए रिकॉर्ड करने का प्रयास करें'
            }
          </p>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;