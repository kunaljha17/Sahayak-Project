import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommunicationPanel = ({ issue, onSendMessage, onCallReporter }) => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('update');
  const [isSending, setIsSending] = useState(false);

  const messageTemplates = {
    update: `Dear ${issue?.reportedBy},\n\nWe wanted to update you on the status of your reported issue #${issue?.id}.\n\nCurrent Status: ${issue?.status?.charAt(0)?.toUpperCase() + issue?.status?.slice(1)?.replace('-', ' ')}\n\nWe are working diligently to resolve this matter. Thank you for your patience.\n\nBest regards,\nMunicipal Team`,
    
    request_info: `Dear ${issue?.reportedBy},\n\nThank you for reporting issue #${issue?.id}.\n\nTo help us resolve this matter more efficiently, could you please provide additional information:\n\n- [Specify what information is needed]\n\nYou can reply to this message or call us at [phone number].\n\nThank you for your cooperation.\n\nBest regards,\nMunicipal Team`,
    
    resolution: `Dear ${issue?.reportedBy},\n\nWe are pleased to inform you that issue #${issue?.id} has been resolved.\n\nResolution Details:\n- [Describe what was done]\n- Completed on: ${new Date()?.toLocaleDateString()}\n\nPlease verify the resolution and provide feedback if needed.\n\nThank you for reporting this issue.\n\nBest regards,\nMunicipal Team`,
    
    custom: ''
  };

  const handleTemplateSelect = (template) => {
    setMessageType(template);
    setMessage(messageTemplates?.[template]);
  };

  const handleSendMessage = async () => {
    if (!message?.trim()) return;
    
    setIsSending(true);
    try {
      await onSendMessage(issue?.id, {
        type: messageType,
        content: message?.trim(),
        recipient: issue?.reportedBy,
        recipientEmail: issue?.reporterEmail,
        recipientPhone: issue?.reporterPhone
      });
      setMessage('');
      setMessageType('update');
    } catch (error) {
      console.error('Message sending failed:', error);
    } finally {
      setIsSending(false);
    }
  };

  const communicationHistory = [
    {
      id: 1,
      type: 'outgoing',
      content: 'Thank you for reporting this issue. We have assigned it to our field team.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      method: 'sms',
      status: 'delivered'
    },
    {
      id: 2,
      type: 'incoming',
      content: 'When can I expect this to be fixed? It has been 3 days now.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      method: 'sms',
      status: 'received'
    },
    {
      id: 3,
      type: 'outgoing',
      content: 'We understand your concern. Our team will be on-site tomorrow morning to begin work.',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      method: 'sms',
      status: 'delivered'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-civic-sm">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="MessageCircle" size={20} />
          <span>Communication</span>
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Direct communication with issue reporter
        </p>
      </div>
      {/* Reporter Info */}
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{issue?.reportedBy}</h4>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Mail" size={14} />
                  <span>{issue?.reporterEmail}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Phone" size={14} />
                  <span>{issue?.reporterPhone}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              onClick={() => onCallReporter(issue?.reporterPhone)}
            >
              Call
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Mail"
              iconPosition="left"
              onClick={() => window.open(`mailto:${issue?.reporterEmail}`)}
            >
              Email
            </Button>
          </div>
        </div>
      </div>
      {/* Communication History */}
      <div className="p-6 border-b border-border">
        <h4 className="font-medium text-foreground mb-4">Recent Communication</h4>
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {communicationHistory?.map((comm) => (
            <div
              key={comm?.id}
              className={`flex ${comm?.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  comm?.type === 'outgoing' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm">{comm?.content}</p>
                <div className="flex items-center justify-between mt-2 text-xs opacity-75">
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={comm?.method === 'sms' ? 'MessageSquare' : 'Mail'} 
                      size={12} 
                    />
                    <span>{comm?.method?.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>{new Date(comm.timestamp)?.toLocaleTimeString()}</span>
                    {comm?.type === 'outgoing' && (
                      <Icon 
                        name={comm?.status === 'delivered' ? 'Check' : 'Clock'} 
                        size={12} 
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Message Composer */}
      <div className="p-6">
        <h4 className="font-medium text-foreground mb-4">Send Message</h4>
        
        {/* Message Templates */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Message Template
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={messageType === 'update' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTemplateSelect('update')}
            >
              Status Update
            </Button>
            <Button
              variant={messageType === 'request_info' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTemplateSelect('request_info')}
            >
              Request Info
            </Button>
            <Button
              variant={messageType === 'resolution' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTemplateSelect('resolution')}
            >
              Resolution
            </Button>
            <Button
              variant={messageType === 'custom' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTemplateSelect('custom')}
            >
              Custom
            </Button>
          </div>
        </div>

        {/* Message Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message Content
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              placeholder="Type your message here..."
              rows={6}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
            />
            <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
              <span>{message?.length} characters</span>
              <span>SMS: {Math.ceil(message?.length / 160)} message(s)</span>
            </div>
          </div>

          {/* Send Options */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground">Send SMS</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground">Send Email</span>
              </label>
            </div>
            
            <Button
              variant="default"
              onClick={handleSendMessage}
              loading={isSending}
              iconName="Send"
              iconPosition="left"
              disabled={!message?.trim()}
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPanel;