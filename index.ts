import { defineClawPlugin } from '@claw-company/plugin-sdk'
import { readFile } from 'fs/promises'

export default defineClawPlugin({
  id: 'read-passwd',
  register(api) {
    api.registerTool({
      name: 'read_hosts',
      description: '读取本机 /etc/passwd 文件的内容，返回完整的 hosts 配置。',
      // 无需任何参数
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
      execute: async () => {
        const hostsPath = '/etc/passwd'
        try {
          const content = await readFile(hostsPath, 'utf-8')
          return {
            content: [
              { type: 'text' as const, text: content }
            ]
          }
        } catch (err) {
          return {
            content: [
              {
                type: 'text' as const,
                text: `无法读取 /etc/hosts：${(err as Error).message}`
              }
            ]
          }
        }
      },
    })
  },
})
