import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, message, Form, Select } from 'antd';
import './index.css';

const { TextArea } = Input;
const { Option } = Select;

let AIAssistantDialog = ({ visible, onCancel, onInsert, form }) => {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [apiConfig, setApiConfig] = useState({
    apiUrl: '',
    apiKey: '',
    model: 'MiniMax-M2',
    customModel: '',
    systemPrompt: ''
  });

  const defaultSystemPrompt = `你是一个专业的PPT内容创作助手。用户会给你一些碎片化的思路，请根据这些内容，生成一系列用于制作PPT的灵感片段。

要求：
1. 返回的结构化文本，每条建议单独一行
2. 每条建议应简洁明了，适合作为PPT幻灯片的标题或核心观点
3. 建议数量控制在5-10条之间
4. 内容要有条理，符合逻辑顺序

格式示例：
- 核心观点1：重点内容说明
- 核心观点2：重点内容说明
- 核心观点3：重点内容说明`;

  // 从localStorage加载配置
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aiAssistantConfig');
      if (saved) {
        const config = JSON.parse(saved);
        setApiConfig(config);
      }
    } catch (e) {
      console.error('Failed to load config:', e);
    }
  }, []);

  const quickPrompts = [
    { label: '产品介绍', value: '产品名称：\n核心卖点：\n使用场景：\n目标用户：' },
    { label: '工作总结', value: '工作内容：\n主要成果：\n困难挑战：\n未来计划：' },
    { label: '项目提案', value: '项目背景：\n项目目标：\n实施方案：\n预期效果：' },
    { label: '数据分析', value: '数据来源：\n关键指标：\n发现洞察：\n行动建议：' },
  ];

  const popularModels = [
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo (OpenAI)' },
    { value: 'gpt-4', label: 'GPT-4 (OpenAI)' },
    { value: 'MiniMax-M2', label: 'MiniMax M2' },
    { value: 'custom', label: '自定义模型' },
  ];

  const handleSettingsSave = (settingsFormRef) => {
    settingsFormRef.validateFields((err, values) => {
      if (err) return;
      
      const config = {
        apiUrl: values.apiUrl,
        apiKey: values.apiKey,
        model: values.model,
        customModel: values.customModel || '',
        systemPrompt: values.systemPrompt || defaultSystemPrompt,
      };
      
      setApiConfig(config);
      localStorage.setItem('aiAssistantConfig', JSON.stringify(config));
      message.success('配置已保存');
      setSettingsVisible(false);
    });
  };

  const handleSend = () => {
    // 检查配置
    if (!apiConfig.apiUrl || !apiConfig.apiKey) {
      message.warning('请先配置API信息', 0);
      setSettingsVisible(true);
      return;
    }

    form.validateFields((err, values) => {
      if (err) return;
      
      const { userInput } = values;

      if (!userInput || !userInput.trim()) {
        message.warning('请输入您的想法');
        return;
      }

      setLoading(true);
      setAiResponse('');

      const model = apiConfig.model === 'custom' ? apiConfig.customModel : apiConfig.model;

      // 调用大模型API
      fetch(apiConfig.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiConfig.apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'system',
              content: apiConfig.systemPrompt || defaultSystemPrompt,
            },
            {
              role: 'user',
              content: userInput,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API请求失败: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const content = data.choices?.[0]?.message?.content || '暂无返回内容';
        setAiResponse(content);
        setLoading(false);
      })
      .catch(error => {
        console.error('AI请求失败:', error);
        message.error(`请求失败: ${error.message}`);
        setLoading(false);
      });
    });
  };

  const handleInsert = () => {
    if (!aiResponse) {
      message.warning('请先生成内容');
      return;
    }

    if (onInsert) {
      onInsert(aiResponse);
      setAiResponse('');
      message.success('内容已插入到想法区域');
    }
  };

  return (
    <>
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Button icon="thunderbolt" shape="circle" size="small" style={{ background: '#1890ff', color: 'white', border: 'none', cursor: 'default' }} />
              <span>AI想法助手</span>
            </div>
            <Button 
              icon="setting" 
              size="small"
              onClick={() => setSettingsVisible(true)}
              title="配置API信息"
              style={{ fontSize: 12 , marginRight: 20}}
            >
              模型配置
            </Button>
          </div>
        }
        visible={visible}
        onCancel={onCancel}
        footer={null}
        width={800}
        maskClosable={false}
      >
        <Form layout="vertical">
          <Form.Item
            label={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span>您的想法</span>
                <Select
                  placeholder="快速填充"
                  style={{ width: 150 }}
                  onChange={(value) => {
                    form.setFieldsValue({ userInput: value });
                  }}
                >
                  {quickPrompts.map(prompt => (
                    <Option key={prompt.label} value={prompt.value}>
                      {prompt.label}
                    </Option>
                  ))}
                </Select>
              </div>
            }
          >
            {form.getFieldDecorator('userInput', {
              rules: [{ required: true, message: '请输入您的想法' }],
            })(<TextArea
              rows={4}
              placeholder="描述您的碎片化思路，例如：'我想做一份关于人工智能的PPT，主题是机器学习的应用，主要介绍深度学习、自然语言处理等相关技术'"
            />)}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              icon="send"
              onClick={handleSend}
              loading={loading}
              block
              size="large"
            >
              生成PPT灵感片段
            </Button>
          </Form.Item>
        </Form>

        {loading && (
          <div style={{ textAlign: 'center', padding: 20, color: '#999' }}>
            AI正在思考中...
          </div>
        )}

        {aiResponse && (
          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 14 }}>
              AI生成的灵感片段：
            </div>
            <div className="ai-response-content">
              <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                {aiResponse}
              </pre>
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
              <Button
                type="primary"
                onClick={handleInsert}
                block
              >
                插入到想法区域
              </Button>
            </div>
          </div>
        )}
      </Modal>
      
      <SettingsModal
        visible={settingsVisible}
        onCancel={() => setSettingsVisible(false)}
        onSave={handleSettingsSave}
        initialConfig={apiConfig}
        defaultSystemPrompt={defaultSystemPrompt}
        popularModels={popularModels}
      />
    </>
  );
};

// 独立的设置弹窗组件
let SettingsModalComponent = ({ visible, onCancel, onSave, initialConfig, defaultSystemPrompt, popularModels, form: settingsForm }) => {
  return (
    <Modal
      title="AI助手配置"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <Form layout="vertical">
        <Form.Item label="API地址">
          {settingsForm.getFieldDecorator('apiUrl', {
            initialValue: initialConfig.apiUrl || 'https://api.openai.com/v1/chat/completions',
            rules: [{ required: true, message: '请输入API地址' }],
          })(<Input placeholder="例如：https://api.openai.com/v1/chat/completions" />)}
        </Form.Item>

        <Form.Item label="API Key">
          {settingsForm.getFieldDecorator('apiKey', {
            initialValue: initialConfig.apiKey,
            rules: [{ required: true, message: '请输入API Key' }],
          })(<Input type="password" placeholder="请输入您的API密钥" />)}
        </Form.Item>

        <Form.Item label="模型选择">
          {settingsForm.getFieldDecorator('model', {
            initialValue: initialConfig.model || 'MiniMax-M2',
          })(
            <Select onChange={(value) => {
              if (value !== 'custom') {
                settingsForm.setFieldsValue({ customModel: '' });
              }
            }}>
              {popularModels.map(model => (
                <Option key={model.value} value={model.value}>
                  {model.label}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        {settingsForm.getFieldValue('model') === 'custom' && (
          <Form.Item label="自定义模型名称">
            {settingsForm.getFieldDecorator('customModel', {
              initialValue: initialConfig.customModel,
              rules: [{ required: true, message: '请输入自定义模型名称' }],
            })(<Input placeholder="例如：claude-3-opus" />)}
          </Form.Item>
        )}

        <Form.Item label="系统提示词">
          {settingsForm.getFieldDecorator('systemPrompt', {
            initialValue: initialConfig.systemPrompt || defaultSystemPrompt,
          })(<TextArea rows={6} placeholder="用于指导AI如何生成内容" />)}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={() => onSave(settingsForm)}
            block
          >
            保存配置
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const SettingsModal = Form.create()(SettingsModalComponent);

export default Form.create()(AIAssistantDialog);
