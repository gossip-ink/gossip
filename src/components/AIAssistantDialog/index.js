import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, message, Form, Select } from 'antd';
import './index.css';

const { TextArea } = Input;
const { Option } = Select;

let AIAssistantDialog = ({ visible, onCancel, onInsert, form }) => {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

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

  const quickPrompts = [
    { label: '产品介绍', value: '产品名称：\n核心卖点：\n使用场景：\n目标用户：' },
    { label: '工作总结', value: '工作内容：\n主要成果：\n困难挑战：\n未来计划：' },
    { label: '项目提案', value: '项目背景：\n项目目标：\n实施方案：\n预期效果：' },
    { label: '数据分析', value: '数据来源：\n关键指标：\n发现洞察：\n行动建议：' },
  ];

  const handleSend = () => {
    form.validateFields((err, values) => {
      if (err) return;
      
      const { apiUrl, apiKey, systemPrompt, userInput } = values;

      if (!userInput || !userInput.trim()) {
        message.warning('请输入您的想法');
        return;
      }

      setLoading(true);
      setAiResponse('');

      // 调用大模型API
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'MiniMax-M2',
          messages: [
            {
              role: 'system',
              content: systemPrompt || defaultSystemPrompt,
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
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Button icon="thunderbolt" shape="circle" size="small" style={{ background: '#1890ff', color: 'white', border: 'none', cursor: 'default' }} />
          <span>AI想法助手</span>
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      maskClosable={false}
    >
      <Form
        layout="vertical"
      >
        <Form.Item label="API地址">
          {form.getFieldDecorator('apiUrl', {
            initialValue: 'https://api.openai.com/v1/chat/completions',
            rules: [{ required: true, message: '请输入API地址' }],
          })(<Input placeholder="例如：https://api.openai.com/v1/chat/completions" />)}
        </Form.Item>

        <Form.Item label="API Key">
          {form.getFieldDecorator('apiKey', {
            rules: [{ required: true, message: '请输入API Key' }],
          })(<Input type="password" placeholder="请输入您的API密钥" />)}
        </Form.Item>

        <Form.Item label="系统提示词">
          {form.getFieldDecorator('systemPrompt', {
            initialValue: defaultSystemPrompt,
          })(<TextArea rows={6} placeholder="输入系统提示词（可选）" />)}
        </Form.Item>

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
  );
};

export default Form.create()(AIAssistantDialog);
