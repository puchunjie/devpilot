import axios from 'axios';
declare module 'axios' {
  export interface AxiosRequestConfig<D = any> {
    /**
     * The name of the repository.
     */
    repo?: string;
  }
}

export enum DevPilotFunctionality {
  /**
   * PluginCommand.ExplainCode
   */
  ExplainCode = 'EXPLAIN_CODE',
  /**
   * PluginCommand.FixCode
   */
  FixCode = 'FIX_CODE',
  /**
   * inline comments. PluginCommand.CommentCode
   */
  CommentCode = 'GENERATE_COMMENTS',
  /**
   * PluginCommand.TestCode
   */
  GenerateTest = 'GENERATE_TESTS',
  /**
   * PluginCommand.CheckCodePerformance
   */
  CheckPerformance = 'CHECK_PERFORMANCE',
  ReviewCode = 'REVIEW_CODE',
  /**
   * summary comment for method
   */
  CommentMethod = 'COMMENT_METHOD',
  GenerateCommit = 'GENERATE_COMMIT',
  /**
   * open chat window
   */
  OpenChat = 'OPEN_CAT',
  ReferenceCode = 'REFERENCE_CODE',
  PureChat = 'PURE_CHAT',
  CodePrediction = 'CODE_PREDICTION',
}

export enum PluginCommand {
  LocaleChanged = 'LocaleChanged',
  ThemeChanged = 'ThemeChanged',
  ConfigurationChanged = 'ConfigurationChanged',
  RenderChatConversation = 'RenderChatConversation',
  LikeMessage = 'LikeMessage',
  DislikeMessage = 'DislikeMessage',
  DeleteMessage = 'DeleteMessage',
  RegenerateMessage = 'RegenerateMessage',
  AppendToConversation = 'AppendToConversation',
  InterruptChatStream = 'InterruptChatStream',
  GotoSelectedCode = 'GotoSelectedCode',
  InsertCodeAtCaret = 'InsertCodeAtCaret',
  ReplaceSelectedCode = 'ReplaceSelectedCode',
  CreateNewFile = 'CreateNewFile',
  ClearChatHistory = 'ClearChatHistory',
  FixCode = 'FixCode',
  ExplainCode = 'ExplainCode',
  CommentCode = 'CommentCode',
  TestCode = 'TestCode',
  CopyCode = 'CopyCode',
  OpenFile = 'OpenFile',
  CheckCodePerformance = 'CheckCodePerformance',
  // PresentCodeEmbeddedState = 'PresentCodeEmbeddedState',
  ReferenceCode = 'ReferenceCode',
}

export type ProviderType = 'OpenAI' | 'Azure' | 'ZA';

export enum Locale {
  Chinese = 'cn',
  English = 'en',
}

export interface CodeReference {
  languageId: string;
  fileUrl: string;
  fileName: string;
  sourceCode: string;
  /**
   * import package name
   */
  packageName?: string;
  /**
   * full document text
   */
  document?: string;
  selectedStartLine: number;
  selectedStartColumn: number;
  selectedEndLine: number;
  selectedEndColumn: number;
  /**
   * if to show in chat window
   */
  // visible: boolean;
}

export type MessageRole = 'user' | 'assistant' | 'system' | 'divider' | 'error';

export interface ChatMessage {
  id: string;
  /**
   * 用户输入或者命令
   */
  content: string;
  status: 'ok' | 'error';
  role: MessageRole;
  username: string;
  avatar: string;
  time: number;
  commandType?: DevPilotFunctionality;
  /**
   * 是否流式回答
   */
  streaming: boolean;
  codeRef?: CodeReference;
  recall?: IRecall;
}

export interface IRecall {
  steps: {
    status: 'loading' | 'done' | 'terminated';
  }[];
  remoteRefs?: CodeReference[];
  localRefs?: CodeReference[];
}

export interface LLMChatHandler {
  onText: (callback: (text: string, options: { id: string }) => void) => void;
  onInterrupted: (callback: () => void) => void;
  result: () => Promise<string>;
  interrupt: () => void;
}

export interface LLMProvider {
  name: string;
  chat: (messages: ChatMessage[], extraOptions?: { repo?: string; signal?: AbortSignal }) => Promise<LLMChatHandler>;
}

export interface LLMProviderOption {
  apiEndpoint?: string;
  apiKey?: string;
  proxy?: string;
  model?: string;
  stream?: boolean;
  username: () => string;
  usertoken: () => string;
  pluginVersion: () => string;
  authType: () => string;
}
