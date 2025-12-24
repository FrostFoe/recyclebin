import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Search, ArrowLeft, Phone, MoreVertical, Paperclip, 
  Smile, Send, Mic, Check, CheckCheck, ChevronDown, X,
  Archive, Trash2, VolumeX, CheckCircle, Settings, Users, 
  Bookmark, CircleHelp, UserPlus, LogOut, Pin, Reply,
  Image as ImageIcon, Moon, Sun, StopCircle, Info, Forward,
  Camera, Bell, Lock, Edit2, Edit3, Megaphone, Ban, Shield, Plus,
  BarChart2, Sticker, Film, PhoneCall, PhoneOff, Video, Grid,
  Clock, Flame, FolderPlus, Eye, Play, Pause, Gamepad2, Languages, Palette, KeyRound,
  PenTool, Eraser, Download, User, Link as LinkIcon, Copy, BellOff
} from 'lucide-react';

// --- Data & Types ---
const COMMON_EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "🔥", "🎉", "💩", "🥰", "🤔", "👋", "🙏", "👀", "✨"];
const ACCENT_COLORS = [
    { name: "Blue", value: "#3390ec" },
    { name: "Purple", value: "#8774e1" },
    { name: "Green", value: "#46c46e" },
    { name: "Orange", value: "#e58e39" },
    { name: "Pink", value: "#f267ad" },
    { name: "Red", value: "#e53935" },
];

const STICKERS = [
  "https://cdn-icons-png.flaticon.com/128/9408/9408166.png",
  "https://cdn-icons-png.flaticon.com/128/9408/9408201.png",
  "https://cdn-icons-png.flaticon.com/128/9408/9408175.png",
  "https://cdn-icons-png.flaticon.com/128/9408/9408226.png",
  "https://cdn-icons-png.flaticon.com/128/9408/9408183.png",
  "https://cdn-icons-png.flaticon.com/128/9408/9408238.png"
];
const GIFS = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXp1ZGI4Z3J5aG56Y3h6Z3I1Z3I1Z3I1Z3I1Z3I1Z3I1/3o7TKSjRrfIPjeiVyM/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXp1ZGI4Z3J5aG56Y3h6Z3I1Z3I1Z3I1Z3I1Z3I1Z3I1/26AHONQ79FdWZhAI0/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXp1ZGI4Z3J5aG56Y3h6Z3I1Z3I1Z3I1Z3I1Z3I1Z3I1/l0HlHJGHe3yAMhdQY/giphy.gif"
];

const MOCK_STORIES = [
    { id: 1, user: "Momo", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Momo", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", viewed: false },
    { id: 2, user: "Coco", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Coco", image: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", viewed: false },
    { id: 3, user: "Bubu", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bubu", image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", viewed: true }
];

const MOCK_CONTACTS = [
  { id: 101, name: "Alice Wonderland", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice", bio: "Curiouser and curiouser!" },
  { id: 102, name: "Bob Builder", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob", bio: "Can we fix it?" },
  { id: 103, name: "Charlie Chaplin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie", bio: "Silence is golden." }
];

const MOCK_MEMBERS = [
    { id: 1, name: "Me", role: "admin", online: true, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me" },
    { id: 2, name: "Alice", role: "member", online: true, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" },
    { id: 3, name: "Bob", role: "member", online: false, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" },
    { id: 4, name: "Charlie", role: "admin", online: false, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie" },
];

const INITIAL_CHATS = [
  {
    id: 0, 
    name: "Saved Messages",
    avatar: "saved", 
    type: "private",
    role: "owner",
    lastMessage: "Note to self...",
    time: "Just now",
    unread: 0,
    online: true,
    archived: false,
    muted: false,
    blocked: false,
    pinnedMessageId: null,
    messages: [
       { id: 1, text: "Meeting notes: Buy milk", sender: "me", time: "10:00 AM", status: 'read', type: 'text', reactions: [] }
    ]
  },
  {
    id: 1,
    name: "Momo 🌸",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Momo",
    type: "private",
    role: "owner",
    lastMessage: "It's a secret! ||Don't tell anyone||",
    time: "10:42 AM",
    unread: 2,
    online: true,
    archived: false,
    muted: false,
    blocked: false,
    bio: "Cat lover | Designer 🎨",
    mobile: "+1 234 567 890",
    pinnedMessageId: null,
    messages: [
      { id: 1, text: "Hey! Are we still meeting?", sender: "them", time: "10:30 AM", status: 'read', reactions: [] },
      { id: 2, text: "Yes! I'm on my way 🚗", sender: "me", time: "10:32 AM", status: 'read', reactions: [{emoji: "🔥", count: 1, me: true}] },
      { id: 4, text: "It's a secret! ||Don't tell anyone||", sender: "them", time: "10:42 AM", status: 'read', reactions: [{emoji: "❤️", count: 2, me: false}] }
    ]
  },
  {
    id: 10,
    name: "Design Team 🎨",
    avatar: "group", 
    type: "group",
    role: "member",
    members: 14,
    lastMessage: "Alice: New mockups are ready!",
    time: "11:00 AM",
    unread: 5,
    online: false, 
    archived: false,
    muted: false,
    blocked: false,
    pinnedMessageId: null,
    messages: [
        { id: 1, text: "Guys, please check the Figma file", sender: "them", senderName: "Alice", time: "10:55 AM", status: 'read', reactions: [] },
        { 
            id: 2, 
            type: "poll", 
            sender: "me", 
            senderName: "Me", 
            time: "10:56 AM", 
            status: 'read', 
            reactions: [],
            question: "When should we launch?", 
            options: [
                { id: 1, text: "Monday", votes: 2, voted: false },
                { id: 2, text: "Wednesday", votes: 5, voted: true },
                { id: 3, text: "Friday", votes: 1, voted: false }
            ]
        }
    ]
  },
  {
    id: 11,
    name: "My Announcements 📢",
    avatar: "channel",
    type: "channel",
    role: "admin",
    subscribers: "5.2K",
    description: "Official channel for my app updates and news.",
    link: "t.me/my_announcements",
    lastMessage: "Broadcast: New update live!",
    time: "9:00 AM",
    unread: 0,
    online: false,
    archived: false,
    muted: false,
    blocked: false,
    pinnedMessageId: null,
    messages: [
        { id: 1, text: "We just launched version 2.0! Enjoy.", sender: "me", time: "9:00 AM", status: 'read', reactions: [{emoji: "🔥", count: 152, me: true}], views: 4500 }
    ]
  },
  {
    id: 12,
    name: "Telegram Tips 💡",
    avatar: "channel",
    type: "channel",
    role: "subscriber",
    subscribers: "125K",
    description: "Daily tips and tricks to get the most out of Telegram.",
    link: "t.me/telegram_tips",
    lastMessage: "Tip #45: Use folders",
    time: "Yesterday",
    unread: 1,
    online: false,
    archived: false,
    muted: true,
    blocked: false,
    pinnedMessageId: null,
    messages: [
        { id: 1, text: "Did you know you can organize chats into folders? Go to Settings > Folders.", sender: "them", time: "Yesterday", status: 'read', reactions: [{emoji: "👍", count: 1200, me: false}], views: 56000 }
    ]
  },
  {
    id: 2,
    name: "Coco 🥥",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Coco",
    type: "private",
    role: "owner",
    lastMessage: "Sticker",
    time: "9:15 AM",
    unread: 0,
    online: false,
    archived: false,
    muted: false,
    blocked: false,
    bio: "Living life one coconut at a time",
    messages: [
      { id: 1, text: "Did you finish the design?", sender: "them", time: "9:00 AM", status: 'read', reactions: [] },
      { id: 2, text: "Almost done!", sender: "me", time: "9:10 AM", status: 'read', reactions: [] }
    ]
  }
];

const MOCK_REPLIES = ["Okay! 👍", "Haha really? 😂", "Sounds good.", "Send me a pic!", "Wait, what?", "Nice!", "I'll check it out.", "👀"];

export default function App() {
  // --- State ---
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState(null);
  const [accentColor, setAccentColor] = useState("#3390ec");
  
  // Navigation & View State
  const [sidebarView, setSidebarView] = useState('main'); 
  const [activeFolder, setActiveFolder] = useState('All'); 
  const [folders, setFolders] = useState([
      { id: 'All', name: 'All', type: 'all', locked: false },
      { id: 'Personal', name: 'Personal', type: 'private', locked: true },
      { id: 'Work', name: 'Work', type: 'group', locked: false }
  ]);
  const [unlockedFolders, setUnlockedFolders] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [chatSearchQuery, setChatSearchQuery] = useState("");
  const [isChatSearchOpen, setIsChatSearchOpen] = useState(false);
  
  // User Settings
  const [myProfile, setMyProfile] = useState({ name: "Me", bio: "Available", phone: "+880 1700 000000", username: "@me_user" });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState({...myProfile});

  // Appearance
  const [darkMode, setDarkMode] = useState(false);

  // Input State
  const [inputText, setInputText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null); 
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pickerTab, setPickerTab] = useState('emoji'); 
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [isAttachMenuOpen, setIsAttachMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selfDestructTime, setSelfDestructTime] = useState(0); 
  const [isTimerMenuOpen, setIsTimerMenuOpen] = useState(false);
  
  // Modal States
  const [forwardState, setForwardState] = useState({ isOpen: false, messageId: null });
  const [callState, setCallState] = useState({ isActive: false, isRinging: false, isConnected: false, type: 'audio', startTime: null });
  const [pollModalOpen, setPollModalOpen] = useState(false);
  const [pollData, setPollData] = useState({ question: '', options: ['', ''] });
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [newFolderData, setNewFolderData] = useState({ name: '', type: 'all' });
  const [viewingStory, setViewingStory] = useState(null);
  const [lockModalOpen, setLockModalOpen] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [targetFolder, setTargetFolder] = useState(null);
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);

  // Context Menus
  const [msgContextMenu, setMsgContextMenu] = useState({ visible: false, x: 0, y: 0, messageId: null });
  const [chatListContextMenu, setChatListContextMenu] = useState({ visible: false, x: 0, y: 0, chatId: null });
  
  // Refs
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingColor, setDrawingColor] = useState('#000000');

  // Derived state
  const activeChat = chats.find((c) => c.id === activeChatId);
  const pinnedMessage = activeChat?.messages.find(m => m.id === activeChat?.pinnedMessageId);

  // --- Dynamic CSS ---
  const dynamicStyles = `
    .text-accent { color: ${accentColor} !important; }
    .bg-accent { background-color: ${accentColor} !important; }
    .border-accent { border-color: ${accentColor} !important; }
    .hover-text-accent:hover { color: ${accentColor} !important; }
    .hover-bg-accent:hover { background-color: ${accentColor} !important; }
    .group:focus-within .focus-within-text-accent { color: ${accentColor} !important; }
    .focus-within-border-accent:focus-within { border-color: ${accentColor} !important; }
    .selection-accent::selection { background-color: ${accentColor}; color: white; }
    
    @keyframes messagePopIn {
      from { opacity: 0; transform: translateY(10px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-message {
      animation: messagePopIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes typingBounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-4px); }
    }
    .typing-dot {
      animation: typingBounce 1.4s infinite ease-in-out both;
    }
    .typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .typing-dot:nth-child(2) { animation-delay: -0.16s; }
    
    /* Toggle Switch */
    .toggle-checkbox:checked {
      right: 0;
      border-color: ${accentColor};
    }
    .toggle-checkbox:checked + .toggle-label {
      background-color: ${accentColor};
    }
  `;

  // --- Helpers ---
  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(msg => {
      let dateKey = "Today";
      if (msg.time.includes("Yesterday")) dateKey = "Yesterday";
      else if (!msg.time.includes("AM") && !msg.time.includes("PM") && msg.time !== "Just now") dateKey = msg.time; 
      
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(msg);
    });
    return groups;
  };

  const getVisibleChats = () => {
    const currentFolderObj = folders.find(f => f.id === activeFolder);
    if (currentFolderObj?.locked && !unlockedFolders.includes(activeFolder)) {
        return [];
    }

    let filtered = chats;
    if (sidebarView === 'archived') {
        filtered = filtered.filter(c => c.archived);
    } else if (sidebarView === 'main') {
        filtered = filtered.filter(c => !c.archived);
        if (currentFolderObj && currentFolderObj.type !== 'all') {
            if (currentFolderObj.type === 'private') filtered = filtered.filter(c => c.type === 'private');
            else if (currentFolderObj.type === 'group') filtered = filtered.filter(c => c.type === 'group' || c.type === 'channel');
        }
    }
    if (searchQuery.trim()) {
      filtered = filtered.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return filtered;
  };
  const visibleChats = getVisibleChats();

  // --- Effects ---
  useEffect(() => {
    if (activeChatId !== null && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats, activeChatId, isTyping]); 

  useEffect(() => {
    setMsgContextMenu({ visible: false, x: 0, y: 0, messageId: null });
    setShowEmojiPicker(false);
    setIsAttachMenuOpen(false);
    setIsTimerMenuOpen(false);
    setReplyTo(null);
    setEditingMessageId(null);
    setIsChatSearchOpen(false);
    setChatSearchQuery("");
    setIsTyping(false); 
  }, [activeChatId]);

  useEffect(() => {
      const interval = setInterval(() => {
          setChats(prevChats => prevChats.map(chat => ({
              ...chat,
              messages: chat.messages.filter(msg => {
                  if (msg.expiresAt && Date.now() > msg.expiresAt) return false;
                  return true;
              })
          })));
      }, 1000);
      return () => clearInterval(interval);
  }, []);

  // Canvas Setup
  useEffect(() => {
      if (isDrawingOpen && canvasRef.current) {
          const canvas = canvasRef.current;
          canvas.width = canvas.offsetWidth * 2;
          canvas.height = canvas.offsetHeight * 2;
          const ctx = canvas.getContext('2d');
          ctx.scale(2, 2);
          ctx.lineCap = 'round';
          ctx.strokeStyle = drawingColor;
          ctx.lineWidth = 3;
          contextRef.current = ctx;
      }
  }, [isDrawingOpen]);

  useEffect(() => {
      if (contextRef.current) {
          contextRef.current.strokeStyle = drawingColor;
      }
  }, [drawingColor]);

  useEffect(() => {
    const handleClick = () => {
      if (msgContextMenu.visible) setMsgContextMenu({ ...msgContextMenu, visible: false });
      if (chatListContextMenu.visible) setChatListContextMenu({ ...chatListContextMenu, visible: false });
      if (isMainMenuOpen) setIsMainMenuOpen(false);
      if (isCreateMenuOpen) setIsCreateMenuOpen(false);
      if (showEmojiPicker) setShowEmojiPicker(false);
      if (isAttachMenuOpen) setIsAttachMenuOpen(false);
      if (isTimerMenuOpen) setIsTimerMenuOpen(false);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [msgContextMenu, chatListContextMenu, isMainMenuOpen, isCreateMenuOpen, showEmojiPicker, isAttachMenuOpen, isTimerMenuOpen]);

  // --- Actions ---
  const handleOpenChat = (id) => {
    setActiveChatId(id);
    setChats(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
    if (window.innerWidth < 768) setIsProfileOpen(false); 
  };
  
  const handleCloseChat = () => {
    setActiveChatId(null);
  };

  const handleSendMessage = (content = inputText, type = 'text') => {
    if (!content && !selectedFile && !isRecording) return;
    if (activeChatId === null) return;

    if (editingMessageId) {
        setChats(prev => prev.map(c => {
            if (c.id === activeChatId) {
                return {
                    ...c,
                    messages: c.messages.map(m => 
                        m.id === editingMessageId 
                        ? { ...m, text: content.trim(), isEdited: true } 
                        : m
                    )
                };
            }
            return c;
        }));
        setEditingMessageId(null);
        setInputText("");
        return;
    }

    const now = new Date();
    const timeString = formatTime(now);
    
    let messageContent = content;
    let messageType = type;

    if (selectedFile) {
        messageContent = selectedFile.name;
        messageType = selectedFile.type.startsWith('image/') ? 'image' : 'file';
    } else if (isRecording) {
        messageContent = "Voice Message (0:05)";
        messageType = 'voice';
    }

    const newMessage = {
      id: Date.now(),
      text: messageContent, 
      type: messageType,
      fileUrl: selectedFile && messageType === 'image' ? URL.createObjectURL(selectedFile) : (messageType === 'sticker' || messageType === 'gif' || messageType === 'image' ? content : null),
      sender: 'me',
      time: timeString,
      status: 'sent',
      reactions: [],
      replyTo: replyTo ? { ...replyTo } : null,
      expiresAt: selfDestructTime > 0 ? Date.now() + (selfDestructTime * 1000) + 2000 : null, 
      selfDestructTime: selfDestructTime,
      gameState: messageType === 'game' ? { board: Array(9).fill(null), xIsNext: true, winner: null } : null,
      views: 1 // Init views
    };

    updateChatWithNewMessage(activeChatId, newMessage);
    
    setInputText("");
    setReplyTo(null);
    setSelectedFile(null);
    setIsRecording(false);
    setShowEmojiPicker(false);

    if (activeChatId !== 0 && activeChat.type !== 'channel') {
        setTimeout(() => {
            setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, messages: c.messages.map(m => m.id === newMessage.id ? { ...m, status: 'read' } : m) } : c));
        }, 1000);

        if (activeChat.type === 'private') {
            setTimeout(() => {
                setIsTyping(true);
            }, 1000);

            setTimeout(() => {
                setIsTyping(false);
                const replyText = MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];
                updateChatWithNewMessage(activeChatId, { id: Date.now() + 1, text: replyText, type: 'text', sender: 'them', time: formatTime(new Date()), status: 'read', reactions: [] });
            }, 3000);
        }
    }
  };

  const updateChatWithNewMessage = (chatId, message) => {
    setChats(prev => {
      const idx = prev.findIndex(c => c.id === chatId);
      if (idx === -1) return prev;
      const updated = {
        ...prev[idx],
        messages: [...prev[idx].messages, message],
        lastMessage: message.type === 'image' ? '🖼️ Photo' : message.type === 'sticker' ? 'Sticker' : message.type === 'gif' ? 'GIF' : message.type === 'poll' ? '📊 Poll' : message.type === 'game' ? '🎮 Game' : message.text,
        time: message.time,
        archived: false
      };
      const newChats = [...prev];
      newChats.splice(idx, 1);
      newChats.unshift(updated);
      return newChats;
    });
  };

  const handleCreateFolder = () => {
      if (!newFolderData.name.trim()) return;
      const newFolder = { id: newFolderData.name, name: newFolderData.name, type: newFolderData.type, locked: false };
      setFolders([...folders, newFolder]);
      setFolderModalOpen(false);
      setNewFolderData({ name: '', type: 'all' });
  };

  const handleCreatePoll = () => {
      const options = pollData.options.filter(o => o.trim() !== '');
      if (!pollData.question.trim() || options.length < 2) return;
      const newMessage = { id: Date.now(), type: 'poll', sender: 'me', time: formatTime(new Date()), status: 'sent', question: pollData.question, options: options.map((opt, i) => ({ id: i, text: opt, votes: 0, voted: false })), reactions: [] };
      updateChatWithNewMessage(activeChatId, newMessage);
      setPollModalOpen(false);
      setPollData({ question: '', options: ['', ''] });
  };

  const handleVote = (messageId, optionId) => {
      setChats(prev => prev.map(c => {
          if (c.id === activeChatId) {
              return { ...c, messages: c.messages.map(m => { if (m.id === messageId && m.type === 'poll') { return { ...m, options: m.options.map(opt => { if (opt.id === optionId && !opt.voted) return { ...opt, votes: opt.votes + 1, voted: true }; if (opt.voted && opt.id !== optionId) return { ...opt, votes: opt.votes - 1, voted: false }; return opt; }) } } return m; }) }
          } return c;
      }));
  };

  const handleMuteToggle = () => {
      setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, muted: !c.muted } : c));
  };

  // --- Folder Lock Logic ---
  const handleFolderClick = (folderId) => {
      const folder = folders.find(f => f.id === folderId);
      if (folder.locked && !unlockedFolders.includes(folderId)) {
          setTargetFolder(folderId);
          setLockModalOpen(true);
      } else {
          setActiveFolder(folderId);
      }
  };

  const handleUnlockFolder = () => {
      if (passcodeInput === "1234") {
          setUnlockedFolders([...unlockedFolders, targetFolder]);
          setActiveFolder(targetFolder);
          setLockModalOpen(false);
          setPasscodeInput("");
      } else {
          alert("Incorrect Passcode (Hint: 1234)");
          setPasscodeInput("");
      }
  };

  // --- Game Logic (Tic-Tac-Toe) ---
  const handleGameMove = (messageId, index) => {
      setChats(prev => prev.map(c => {
          if (c.id === activeChatId) {
              return { ...c, messages: c.messages.map(m => {
                  if (m.id === messageId && m.type === 'game' && !m.gameState.winner && !m.gameState.board[index]) {
                      const newBoard = [...m.gameState.board];
                      newBoard[index] = m.gameState.xIsNext ? 'X' : 'O';
                      const winner = calculateWinner(newBoard);
                      return { ...m, gameState: { board: newBoard, xIsNext: !m.gameState.xIsNext, winner } };
                  }
                  return m;
              })}
          }
          return c;
      }));
  };

  const calculateWinner = (squares) => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
  };

  // --- Drawing Logic ---
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const sendDrawing = () => {
      const image = canvasRef.current.toDataURL("image/png");
      handleSendMessage(image, 'image');
      setIsDrawingOpen(false);
  };

  // --- Calls ---
  const startCall = (type) => { setCallState({ isActive: true, isRinging: true, isConnected: false, type: type, startTime: null }); setTimeout(() => { if (callState.isActive) setCallState(prev => ({ ...prev, isRinging: false, isConnected: true, startTime: Date.now() })); }, 3000); };
  const endCall = () => { setCallState({ isActive: false, isRinging: false, isConnected: false, type: 'audio', startTime: null }); };

  // --- Common Handlers ---
  const handleCreateChat = (type) => { const id = Date.now(); const newChat = { id, name: type === 'channel' ? "New Channel" : (type === 'group' ? "New Group" : "New Chat"), avatar: type, type, role: 'admin', members: type === 'group' ? 1 : null, subscribers: type === 'channel' ? "1" : null, lastMessage: type === 'channel' ? "Channel created" : "Group created", time: "Just now", unread: 0, online: false, blocked: false, messages: [] }; setChats([newChat, ...chats]); handleOpenChat(id); setIsCreateMenuOpen(false); };
  const handleStartContactChat = (contact) => { const existing = chats.find(c => c.name === contact.name); if (existing) handleOpenChat(existing.id); else { const newChat = { id: Date.now(), name: contact.name, avatar: contact.avatar, type: "private", role: 'owner', bio: contact.bio, lastMessage: "", time: "", unread: 0, online: false, blocked: false, messages: [] }; setChats([newChat, ...chats]); handleOpenChat(newChat.id); } setSidebarView('main'); };

  // --- Context Actions ---
  const handleForwardMessage = (targetChatId) => { if (!forwardState.messageId || activeChatId === null) return; const originalMsg = activeChat.messages.find(m => m.id === forwardState.messageId); if (!originalMsg) return; const forwardedMsg = { ...originalMsg, id: Date.now(), sender: 'me', isForwarded: true, time: formatTime(new Date()), status: 'sent', reactions: [] }; updateChatWithNewMessage(targetChatId, forwardedMsg); setForwardState({ isOpen: false, messageId: null }); handleOpenChat(targetChatId); };
  const handleMessageContextMenu = (e, messageId) => { e.preventDefault(); e.stopPropagation(); setIsMainMenuOpen(false); setMsgContextMenu({ visible: true, x: e.clientX, y: e.clientY, messageId }); };
  
  const handleMessageAction = (action, messageId) => {
    if (activeChatId === null) return;
    if (action === 'delete') setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, messages: c.messages.filter(m => m.id !== messageId) } : c));
    else if (action === 'pin') setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, pinnedMessageId: c.pinnedMessageId === messageId ? null : messageId } : c));
    else if (action === 'reply') { const msg = activeChat.messages.find(m => m.id === messageId); if (msg) { setReplyTo(msg); inputRef.current?.focus(); } }
    else if (action === 'forward') setForwardState({ isOpen: true, messageId: messageId });
    else if (action === 'edit') { const msg = activeChat.messages.find(m => m.id === messageId); if (msg && msg.sender === 'me') { setEditingMessageId(messageId); setInputText(msg.text); inputRef.current?.focus(); } else alert("You can only edit your own messages."); }
    else if (action === 'translate') {
        setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, messages: c.messages.map(m => m.id === messageId ? { ...m, text: `[Translated] ${m.text.split('').reverse().join('')}` } : m) } : c)); 
    }
    setMsgContextMenu({ ...msgContextMenu, visible: false });
  };
  const handleChatAction = (action, chatId) => { const id = chatId || chatListContextMenu.chatId; if (!id) return; setChats(prev => prev.map(c => { if (c.id === id) { if (action === 'archive') return { ...c, archived: !c.archived }; if (action === 'block') return { ...c, blocked: !c.blocked }; } return c; }).filter(c => { if ((action === 'delete' || action === 'leave') && c.id === id) return false; return true; })); setChatListContextMenu({ ...chatListContextMenu, visible: false }); if (action === 'block' && isProfileOpen) setIsProfileOpen(true); if ((action === 'delete' || action === 'leave') && activeChatId === id) setActiveChatId(null); };
  const handleReactionClick = (emoji) => { if (!msgContextMenu.messageId || activeChatId === null) return; setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, messages: c.messages.map(m => m.id === msgContextMenu.messageId ? { ...m, reactions: (m.reactions.some(r => r.emoji === emoji && r.me) ? (m.reactions.find(r => r.emoji === emoji).count === 1 ? m.reactions.filter(r => r.emoji !== emoji) : m.reactions.map(r => r.emoji === emoji ? { ...r, count: r.count - 1, me: false } : r)) : [...m.reactions.filter(r => r.emoji !== emoji), { emoji, count: (m.reactions.find(r => r.emoji === emoji)?.count || 0) + 1, me: true }]) } : m) } : c)); setMsgContextMenu({ ...msgContextMenu, visible: false }); };

  // --- Components ---
  const SpoilerText = ({ text }) => {
      const [revealed, setRevealed] = useState(false);
      const parts = text.split(/(\|\|.*?\|\|)/g);
      return (
          <span>
              {parts.map((part, i) => {
                  if (part.startsWith('||') && part.endsWith('||')) {
                      return (
                          <span 
                            key={i} 
                            onClick={() => setRevealed(!revealed)} 
                            className={`cursor-pointer px-1 rounded transition-all duration-300 ${revealed ? '' : 'bg-gray-400 text-transparent blur-[4px] select-none'}`}
                          >
                              {part.slice(2, -2)}
                          </span>
                      );
                  }
                  return part;
              })}
          </span>
      );
  };

  // --- Styles ---
  const bgClass = darkMode ? "bg-[#0f0f0f]" : "bg-white";
  const textClass = darkMode ? "text-white" : "text-gray-900";
  const subTextClass = darkMode ? "text-gray-400" : "text-gray-500";
  const sidebarBg = darkMode ? "bg-[#212121]" : "bg-white"; 
  const borderClass = darkMode ? "border-black" : "border-gray-200";
  const hoverClass = darkMode ? "hover:bg-[#2c2c2e]" : "hover:bg-gray-100";
  const myBubble = `text-white`; 
  const theirBubble = darkMode ? "bg-[#212121] text-white" : "bg-white text-black";

  return (
    <div className={`font-sans h-[100dvh] overflow-hidden flex justify-center items-center ${darkMode ? 'bg-[#0f0f0f]' : 'bg-gray-200'} text-gray-800`}>
      <style>{`
        .font-sans { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .telegram-bg {
            background-color: ${darkMode ? '#0f0f0f' : '#8E99A3'}; 
            background-image: url("https://web.telegram.org/a/chat-bg-pattern-dark.ad38368a9e8140d0.png"); 
            background-size: 400px;
            background-blend-mode: overlay;
        }
        .animate-scale-in { animation: scaleIn 0.1s ease-out forwards; }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .call-pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); } 70% { box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); } }
        .animate-progress { animation: progress 5s linear forwards; }
        @keyframes progress { from { width: 0% } to { width: 100% } }
        
        ${dynamicStyles}
      `}</style>

      {/* --- Call Overlay --- */}
      {callState.isActive && (
          <div className="fixed inset-0 z-[100] bg-gray-900 flex flex-col items-center justify-center text-white">
              <div className="absolute top-10 left-10 flex items-center gap-2"><Shield className="w-5 h-5" /> <span className="text-sm">End-to-end encrypted</span></div>
              <img src={activeChat.avatar} className="w-32 h-32 rounded-full mb-6 border-4 border-gray-700 object-cover" />
              <h2 className="text-3xl font-bold mb-2">{activeChat.name}</h2>
              <p className="text-gray-400 mb-12">{callState.isRinging ? "Ringing..." : "00:05"}</p>
              <div className="flex gap-16 items-center">
                  <button className="p-4 bg-gray-700 rounded-full hover:bg-gray-600 transition"><Mic className="w-8 h-8" /></button>
                  <button onClick={endCall} className="p-5 bg-red-500 rounded-full hover:bg-red-600 transition call-pulse"><PhoneOff className="w-10 h-10 fill-current" /></button>
                  <button className="p-4 bg-gray-700 rounded-full hover:bg-gray-600 transition"><VolumeX className="w-8 h-8" /></button>
              </div>
          </div>
      )}

      {/* --- Story Viewer --- */}
      {viewingStory && (
          <div className="fixed inset-0 z-[80] bg-black flex flex-col items-center justify-center">
              <div className="absolute top-4 w-full px-4 flex gap-1"><div className="h-1 bg-white/30 flex-1 rounded overflow-hidden"><div className="h-full bg-white w-full animate-progress"></div></div></div>
              <div className="absolute top-8 left-4 flex items-center gap-2 z-10">
                  <img src={viewingStory.avatar} className="w-8 h-8 rounded-full border border-white" />
                  <span className="text-white font-bold text-sm shadow-black drop-shadow-md">{viewingStory.user}</span>
                  <span className="text-white/70 text-xs">2h ago</span>
              </div>
              <button onClick={() => setViewingStory(null)} className="absolute top-8 right-4 text-white"><X size={24}/></button>
              <img src={viewingStory.image} className="max-h-full max-w-full object-contain" />
          </div>
      )}

      {/* --- Lock Modal --- */}
      {lockModalOpen && (
          <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4">
              <div className={`w-[90%] max-w-sm rounded-xl shadow-2xl ${sidebarBg} ${textClass} p-6 flex flex-col items-center`}>
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4"><Lock className="w-8 h-8 text-gray-500" /></div>
                  <h3 className="font-bold text-lg mb-2">Folder Locked</h3>
                  <p className="text-sm text-gray-500 mb-4 text-center">Enter passcode to view this folder</p>
                  <input autoFocus type="password" value={passcodeInput} onChange={(e) => setPasscodeInput(e.target.value)} className={`w-full p-2 text-center text-xl tracking-widest rounded border outline-none mb-4 ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50'}`} maxLength={4} />
                  <div className="flex gap-2 w-full">
                      <button onClick={() => { setLockModalOpen(false); setPasscodeInput(""); }} className="flex-1 py-2 text-gray-500 hover:bg-gray-100 rounded">Cancel</button>
                      <button onClick={handleUnlockFolder} className="flex-1 py-2 text-white rounded font-bold bg-accent">Unlock</button>
                  </div>
              </div>
          </div>
      )}

      {/* --- Drawing Modal --- */}
      {isDrawingOpen && (
          <div className="fixed inset-0 z-[90] bg-black/80 flex flex-col items-center justify-center p-4">
              <div className="bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col relative w-full max-w-lg">
                  <div className="absolute top-2 right-2 flex gap-2">
                      <button onClick={() => { 
                          const ctx = canvasRef.current.getContext('2d'); 
                          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                      }} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><Trash2 size={20} className="text-red-500"/></button>
                      <button onClick={() => setIsDrawingOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X size={20}/></button>
                  </div>
                  <canvas 
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    onMouseLeave={finishDrawing}
                    onTouchStart={(e) => startDrawing({ nativeEvent: e.touches[0] })}
                    onTouchMove={(e) => draw({ nativeEvent: e.touches[0] })}
                    onTouchEnd={finishDrawing}
                    className="cursor-crosshair bg-white w-full h-[400px]"
                  />
                  <div className="p-4 bg-gray-100 flex justify-between items-center">
                      <div className="flex gap-2">
                          {['#000000', '#ef4444', '#22c55e', '#3b82f6', '#eab308'].map(color => (
                              <button 
                                key={color}
                                onClick={() => setDrawingColor(color)} 
                                className={`w-8 h-8 rounded-full border-2 ${drawingColor === color ? 'border-gray-600 scale-110' : 'border-white'}`}
                                style={{backgroundColor: color}}
                              />
                          ))}
                      </div>
                      <button onClick={sendDrawing} className="px-6 py-2 bg-accent text-white rounded-full font-bold hover:opacity-90 flex items-center gap-2">
                          <Send size={18} /> Send
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* --- Poll Modal --- */}
      {pollModalOpen && (
          <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4">
              <div className={`w-[90%] max-w-sm rounded-xl shadow-2xl ${sidebarBg} ${textClass}`}>
                  <div className={`p-4 border-b flex justify-between items-center ${borderClass}`}><h3 className="font-bold">Create Poll</h3><button onClick={() => setPollModalOpen(false)}><X className={subTextClass} /></button></div>
                  <div className="p-4 flex flex-col gap-3">
                      <input type="text" placeholder="Ask a question..." value={pollData.question} onChange={(e) => setPollData({...pollData, question: e.target.value})} className={`w-full p-2 rounded border outline-none ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50'}`}/>
                      {pollData.options.map((opt, i) => (<input key={i} type="text" placeholder={`Option ${i+1}`} value={opt} onChange={(e) => { const newOpts = [...pollData.options]; newOpts[i] = e.target.value; setPollData({...pollData, options: newOpts}); }} className={`w-full p-2 rounded border outline-none ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50'}`}/>))}
                      <button onClick={() => setPollData({...pollData, options: [...pollData.options, '']})} className="text-sm flex items-center gap-1 font-medium hover-bg-accent w-max px-2 py-1 rounded text-accent"><Plus size={16} /> Add Option</button>
                      <button onClick={handleCreatePoll} className="w-full text-white py-2 rounded-lg mt-2 font-bold hover:opacity-90 bg-accent">Create</button>
                  </div>
              </div>
          </div>
      )}

      {/* --- Folder Modal --- */}
      {folderModalOpen && (
          <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4">
              <div className={`w-[90%] max-w-sm rounded-xl shadow-2xl ${sidebarBg} ${textClass}`}>
                  <div className={`p-4 border-b flex justify-between items-center ${borderClass}`}><h3 className="font-bold">New Folder</h3><button onClick={() => setFolderModalOpen(false)}><X className={subTextClass} /></button></div>
                  <div className="p-4 flex flex-col gap-3">
                      <input type="text" value={newFolderData.name} onChange={e => setNewFolderData({...newFolderData, name: e.target.value})} className={`w-full p-2 rounded border outline-none ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50'}`} placeholder="Folder Name" />
                      <div className="flex gap-2">
                          {['all', 'private', 'group'].map(type => (
                              <button key={type} onClick={() => setNewFolderData({...newFolderData, type})} className={`flex-1 py-2 text-xs font-bold rounded border capitalize ${newFolderData.type === type ? 'text-white bg-accent border-accent' : `${darkMode ? 'border-gray-600' : 'border-gray-200'} ${subTextClass}`}`}>{type}</button>
                          ))}
                      </div>
                      <button onClick={handleCreateFolder} className="w-full text-white py-2 rounded-lg mt-4 font-bold hover:opacity-90 bg-accent">Create Folder</button>
                  </div>
              </div>
          </div>
      )}

      <div className={`w-full h-full relative flex shadow-2xl overflow-hidden md:max-w-[1600px] md:h-full ${sidebarBg}`}>
        
        {/* --- LEFT SIDEBAR --- */}
        <div className={`flex flex-col border-r z-20 transition-all duration-300 ${borderClass} ${sidebarBg} 
            ${activeChatId !== null ? 'hidden md:flex md:w-[380px] lg:w-[420px]' : 'w-full md:w-[380px] lg:w-[420px]'}
        `}>
          <header className="px-3 pt-2 pb-2 flex flex-col gap-2 shrink-0 relative">
             <div className="flex gap-3 items-center w-full">
                {/* Menu / Search Row */}
                {sidebarView !== 'main' ? (
                    <button onClick={() => setSidebarView('main')} className={`p-2 rounded-full transition ${hoverClass} ${subTextClass}`}><ArrowLeft className="w-6 h-6" /></button>
                ) : (
                    <button onClick={(e) => { e.stopPropagation(); setIsMainMenuOpen(!isMainMenuOpen); }} className={`p-2 rounded-full transition ${isMainMenuOpen ? 'bg-gray-100 text-accent' : subTextClass} ${hoverClass}`}><Menu className="w-6 h-6" /></button>
                )}
                <div className={`flex-1 rounded-full flex items-center px-4 py-2 border border-transparent focus-within-border-accent transition group ${darkMode ? 'bg-[#1c1c1d] border-gray-700' : 'bg-gray-100'}`}>
                    <Search className="w-5 h-5 text-gray-400 group-focus-text-accent" />
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search" className={`bg-transparent border-none outline-none text-sm ml-2 w-full placeholder-gray-500 min-w-0 ${textClass}`}/>
                </div>
             </div>

             {/* Stories Section */}
             {sidebarView === 'main' && (
                 <div className="flex gap-4 overflow-x-auto no-scrollbar mt-1 pb-2 px-1">
                     <div className="flex flex-col items-center gap-1 min-w-[60px] cursor-pointer">
                         <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400"><Plus size={24}/></div>
                         <span className="text-xs text-gray-500 font-medium">My Story</span>
                     </div>
                     {MOCK_STORIES.map(story => (
                         <div key={story.id} onClick={() => setViewingStory(story)} className="flex flex-col items-center gap-1 min-w-[60px] cursor-pointer">
                             <div className={`w-14 h-14 rounded-full p-[2px] ${story.viewed ? 'bg-gray-300' : 'bg-accent'}`}>
                                 <img src={story.avatar} className={`w-full h-full rounded-full border-2 ${darkMode ? 'border-[#1c1c1d]' : 'border-white'} object-cover`} />
                             </div>
                             <span className={`text-xs font-medium ${textClass}`}>{story.user}</span>
                         </div>
                     ))}
                 </div>
             )}

             {/* Folders Tab */}
             {sidebarView === 'main' && (
                 <div className="flex items-center gap-4 overflow-x-auto no-scrollbar mt-1 border-b border-gray-100 pb-0 px-2">
                     {folders.map(folder => (
                         <button 
                            key={folder.id} 
                            onClick={() => handleFolderClick(folder.id)} 
                            className={`pb-2 text-sm font-medium transition whitespace-nowrap flex items-center gap-1 border-b-2 ${activeFolder === folder.id ? 'border-accent text-accent' : `border-transparent ${subTextClass} hover:text-gray-700`}`}
                         >
                             {folder.locked && <Lock size={12} />}
                             {folder.name}
                         </button>
                     ))}
                     <button onClick={() => setFolderModalOpen(true)} className={`pb-2 ${subTextClass} ${hoverClass}`}><FolderPlus size={16} /></button>
                 </div>
             )}

            {/* Main Menu */}
            {isMainMenuOpen && sidebarView === 'main' && (
              <div className={`absolute top-14 left-4 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.15)] border w-64 py-2 z-50 animate-scale-in origin-top-left flex flex-col ${sidebarBg} ${borderClass}`} onClick={(e) => e.stopPropagation()}>
                <button onClick={() => { handleOpenChat(0); setIsMainMenuOpen(false); }} className={`flex items-center gap-4 px-4 py-2.5 transition text-[15px] ${hoverClass} ${textClass}`}><Bookmark className="w-5 h-5 text-gray-500" /> Saved Messages</button>
                <button onClick={() => { setSidebarView('archived'); setIsMainMenuOpen(false); }} className={`flex items-center gap-4 px-4 py-2.5 transition text-[15px] ${hoverClass} ${textClass}`}><Archive className="w-5 h-5 text-gray-500" /> Archived Chats</button>
                <button onClick={() => { setSidebarView('contacts'); setIsMainMenuOpen(false); }} className={`flex items-center gap-4 px-4 py-2.5 transition text-[15px] ${hoverClass} ${textClass}`}><Users className="w-5 h-5 text-gray-500" /> Contacts</button>
                <button onClick={() => { setSidebarView('settings'); setIsMainMenuOpen(false); }} className={`flex items-center gap-4 px-4 py-2.5 transition text-[15px] ${hoverClass} ${textClass}`}><Settings className="w-5 h-5 text-gray-500" /> Settings</button>
                <button onClick={() => setDarkMode(!darkMode)} className={`flex items-center gap-4 px-4 py-2.5 transition text-[15px] ${hoverClass} ${textClass}`}>{darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-500" />} {darkMode ? "Light Mode" : "Night Mode"}</button>
              </div>
            )}
            
            {/* Create Chat FAB - Positioned Bottom Right of Sidebar */}
            <button 
                onClick={(e) => { e.stopPropagation(); setIsCreateMenuOpen(!isCreateMenuOpen); }} 
                className={`absolute bottom-6 right-6 w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition z-50`}
            >
               <Edit2 className="w-6 h-6" />
            </button>

            {isCreateMenuOpen && (
                <div className={`absolute bottom-24 right-6 rounded-xl shadow-xl border w-48 py-2 z-50 animate-scale-in origin-bottom-right flex flex-col ${sidebarBg} ${borderClass}`} onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => handleCreateChat('group')} className={`flex items-center gap-3 px-4 py-2.5 transition text-[15px] ${hoverClass} ${textClass}`}><Users className="w-4 h-4 text-gray-500" /> New Group</button>
                    <button onClick={() => handleCreateChat('channel')} className={`flex items-center gap-3 px-4 py-2.5 transition text-[15px] ${hoverClass} ${textClass}`}><Megaphone className="w-4 h-4 text-gray-500" /> New Channel</button>
                    <button onClick={() => { setSidebarView('contacts'); setIsCreateMenuOpen(false); }} className={`flex items-center gap-3 px-4 py-2.5 transition text-[15px] ${hoverClass} ${textClass}`}><UserPlus className="w-4 h-4 text-gray-500" /> New Chat</button>
                </div>
            )}
          </header>
          
          <div className="flex-1 overflow-y-auto no-scrollbar">
              {sidebarView === 'main' || sidebarView === 'archived' ? (
                <>
                  {visibleChats.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                          {activeFolder === 'Personal' && folders.find(f => f.id === 'Personal').locked && !unlockedFolders.includes('Personal') ? (
                              <div className="text-center">
                                  <Lock size={40} className="mx-auto mb-2 opacity-50" />
                                  <p>This folder is locked</p>
                              </div>
                          ) : (
                              <p>No chats found</p>
                          )}
                      </div>
                  )}
                  {visibleChats.map((chat) => (
                    <div key={chat.id} onClick={() => handleOpenChat(chat.id)} onContextMenu={(e) => { e.preventDefault(); setChatListContextMenu({visible: true, x: e.clientX, y: e.clientY, chatId: chat.id}); }} className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition select-none ${activeChatId === chat.id ? 'bg-accent text-white' : hoverClass}`}>
                        <div className="relative shrink-0">
                           {chat.id === 0 ? <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent"><Bookmark className="w-6 h-6 text-white" /></div> : chat.avatar === 'group' ? <div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center"><Users className="w-6 h-6 text-white" /></div> : chat.avatar === 'channel' ? <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center"><Megaphone className="w-6 h-6 text-white" /></div> : <img src={chat.avatar} className="w-12 h-12 rounded-full bg-gray-200 object-cover" alt={chat.name} />}
                           {chat.online && <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 ${activeChatId === chat.id ? 'bg-white border-accent' : 'bg-green-500 border-white'}`}></div>}
                        </div>
                        <div className={`flex-1 min-w-0 border-b pb-2 ml-1 h-full flex flex-col justify-center ${borderClass} ${activeChatId === chat.id ? 'border-transparent' : ''}`}>
                            <div className="flex justify-between items-baseline">
                                <h3 className={`font-semibold text-[15px] truncate flex items-center gap-1 min-w-0 ${activeChatId === chat.id ? 'text-white' : textClass}`}>{chat.name} {chat.blocked && <Ban className="w-3 h-3 text-red-500" />} {chat.muted && <VolumeX className="w-3 h-3 opacity-50" />}</h3>
                                <span className={`text-xs ${activeChatId === chat.id ? 'text-white/80' : subTextClass}`}>{chat.time}</span>
                            </div>
                            <div className="flex justify-between items-center mt-0.5">
                                <p className={`text-[14px] truncate flex-1 min-w-0 ${activeChatId === chat.id ? 'text-white/80' : subTextClass}`}>{chat.lastMessage}</p>
                                {chat.unread > 0 && <div className={`min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full flex items-center justify-center ml-2 ${activeChatId === chat.id ? 'bg-white text-accent' : 'text-white'}`} style={activeChatId !== chat.id ? {backgroundColor: '#c4c9cc'} : {}}>{chat.unread}</div>}
                            </div>
                        </div>
                    </div>
                  ))}
                </>
              ) : sidebarView === 'contacts' ? (
                  <div className="p-2">
                      <div className={`px-4 py-2 text-sm font-bold ${subTextClass} uppercase`}>Contacts</div>
                      {MOCK_CONTACTS.map(contact => (
                          <div key={contact.id} onClick={() => handleStartContactChat(contact)} className={`flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg ${hoverClass}`}><img src={contact.avatar} className="w-10 h-10 rounded-full bg-gray-200" alt={contact.name} /><div><h3 className={`font-medium ${textClass}`}>{contact.name}</h3><p className={`text-xs ${subTextClass}`}>{contact.bio}</p></div></div>
                      ))}
                  </div>
              ) : sidebarView === 'settings' ? (
                  <div className="p-0">
                      <div className="flex flex-col items-center py-6 border-b border-gray-200"><div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3 bg-accent">{myProfile.name[0]}</div>
                          {isEditingProfile ? (
                              <div className="flex flex-col gap-2 w-3/4"><input type="text" value={tempProfile.name} onChange={e => setTempProfile({...tempProfile, name: e.target.value})} className="border p-1 rounded" /><input type="text" value={tempProfile.bio} onChange={e => setTempProfile({...tempProfile, bio: e.target.value})} className="border p-1 rounded text-sm" /><div className="flex gap-2 justify-center mt-2"><button onClick={handleSaveSettings} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Save</button><button onClick={() => setIsEditingProfile(false)} className="bg-gray-300 px-3 py-1 rounded text-sm">Cancel</button></div></div>
                          ) : (
                              <><h2 className={`text-xl font-bold ${textClass}`}>{myProfile.name}</h2><p className={subTextClass}>{myProfile.phone}</p><p className={`text-sm mt-1 ${textClass}`}>"{myProfile.bio}"</p><button onClick={() => { setTempProfile(myProfile); setIsEditingProfile(true); }} className="mt-3 text-sm flex items-center gap-1 text-accent"><Edit2 size={14} /> Edit Profile</button></>
                          )}
                      </div>
                      <div className="p-4 border-b border-gray-100">
                          <div className={`text-xs font-bold ${subTextClass} uppercase mb-2`}>Accent Color</div>
                          <div className="flex gap-2 justify-center">
                              {ACCENT_COLORS.map(color => (
                                  <button key={color.value} onClick={() => setAccentColor(color.value)} className={`w-8 h-8 rounded-full border-2 ${accentColor === color.value ? 'border-gray-600 scale-110' : 'border-transparent'}`} style={{backgroundColor: color.value}}></button>
                              ))}
                          </div>
                      </div>
                      <div className="p-2"><div className={`flex items-center gap-4 px-4 py-3 ${hoverClass} cursor-pointer`}><Bell className="w-5 h-5 text-gray-500" /> <span className={textClass}>Notifications</span></div><div className={`flex items-center gap-4 px-4 py-3 ${hoverClass} cursor-pointer`}><Lock className="w-5 h-5 text-gray-500" /> <span className={textClass}>Privacy and Security</span></div></div>
                  </div>
              ) : null}
          </div>
        </div>

        {/* --- MAIN CHAT AREA --- */}
        <div className={`flex-1 flex flex-col relative bg-[#0e1621] ${activeChatId === null ? 'hidden md:flex' : 'flex'}`}>
          {activeChat ? (
            <>
              {/* Chat Header */}
              <header className={`px-4 py-2 flex items-center justify-between shadow-sm z-10 shrink-0 h-[60px] ${sidebarBg}`}>
                <div className="flex items-center gap-4 flex-1 cursor-pointer min-w-0" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                  <button onClick={(e) => { e.stopPropagation(); handleCloseChat(); }} className="md:hidden text-gray-500"><ArrowLeft /></button>
                  {activeChatId === 0 ? <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent flex-shrink-0"><Bookmark className="text-white w-5 h-5" /></div> : activeChat.avatar === 'group' ? <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center flex-shrink-0"><Users className="w-5 h-5 text-white" /></div> : activeChat.avatar === 'channel' ? <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"><Megaphone className="w-5 h-5 text-white" /></div> : <img src={activeChat.avatar} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />}
                  <div className="flex flex-col min-w-0">
                    <h2 className={`font-bold text-[16px] leading-tight truncate ${textClass}`}>{activeChat.name}</h2>
                    {activeChatId !== 0 && <span className={`text-[13px] truncate ${activeChat.online ? 'text-accent' : 'text-gray-500'}`}>{activeChat.blocked ? <span className="text-red-500 font-bold">Blocked</span> : isTyping ? 'typing...' : activeChat.type === 'group' ? `${activeChat.members} members` : activeChat.type === 'channel' ? `${activeChat.subscribers} subscribers` : activeChat.online ? 'online' : activeChat.lastSeen || 'last seen recently'}</span>}
                  </div>
                </div>
                <div className="flex gap-4 text-gray-500 items-center flex-shrink-0">
                    {isChatSearchOpen ? <div className="flex items-center bg-gray-100 rounded-full px-3 py-1"><input autoFocus value={chatSearchQuery} onChange={(e) => setChatSearchQuery(e.target.value)} className="bg-transparent outline-none text-sm w-32" placeholder="Search..." /><button onClick={() => setIsChatSearchOpen(false)}><X className="w-4 h-4" /></button></div> : <button onClick={() => setIsChatSearchOpen(true)} className={`hover-text-accent`}><Search className="w-5 h-5" /></button>}
                    <button onClick={() => startCall('audio')} className={`hover-text-accent`}><Phone className="w-5 h-5" /></button>
                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className={`hover-text-accent hidden md:block`}><Info className="w-5 h-5" /></button>
                    <button className={`hover-text-accent`}><MoreVertical className="w-5 h-5" /></button>
                </div>
              </header>

              {/* Pinned Message */}
              {pinnedMessage && (
                  <div className={`px-4 py-2 border-b flex items-center justify-between gap-3 text-sm cursor-pointer z-10 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                      <div className="flex items-center gap-3 overflow-hidden min-w-0"><div className="w-0.5 h-8 rounded-full bg-accent flex-shrink-0"></div><div className="flex flex-col min-w-0"><span className="font-semibold text-xs text-accent">Pinned Message</span><span className={`truncate ${subTextClass} text-xs`}>{pinnedMessage.text}</span></div></div>
                      <button onClick={() => handleMessageAction('pin', pinnedMessage.id)}><X className="w-4 h-4 text-gray-400" /></button>
                  </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-2 relative bg-[#99ba92]">
                <div className="absolute inset-0 opacity-40 pointer-events-none telegram-bg" style={{backgroundColor: darkMode ? '#0f0f0f' : '#7a8c76'}}></div>
                <div className="relative z-0 max-w-3xl mx-auto flex flex-col justify-end min-h-full pb-2">
                    {Object.entries(groupMessagesByDate(activeChat.messages)).map(([date, msgs]) => (
                        <div key={date}>
                            <div className="flex justify-center my-2 sticky top-2 z-10"><span className="bg-black/20 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">{date}</span></div>
                            {msgs.filter(m => !chatSearchQuery || (m.text && m.text.toLowerCase().includes(chatSearchQuery.toLowerCase()))).map((msg) => {
                                const isMe = msg.sender === 'me';
                                return (
                                    <div key={msg.id} onContextMenu={(e) => handleMessageContextMenu(e, msg.id)} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} mb-1 group animate-message`}>
                                        <div className={`relative max-w-[85%] px-3 py-1.5 shadow-sm text-[15px] rounded-lg ${isMe ? `${myBubble} rounded-tr-none bg-accent` : `${theirBubble} rounded-tl-none`}`} style={isMe && darkMode ? {backgroundColor: '#766ac8'} : {}}>
                                            {!isMe && activeChat.type === 'group' && <div className="text-xs text-[#e17076] font-semibold mb-0.5">{msg.senderName || activeChat.name}</div>}
                                            {msg.isForwarded && <div className="text-xs font-medium mb-1 flex items-center gap-1 text-accent"><Forward size={12}/> Forwarded message</div>}
                                            {msg.replyTo && <div className={`mb-1 pl-2 border-l-2 text-xs opacity-80 cursor-pointer border-accent`} style={isMe ? {borderColor: 'rgba(255,255,255,0.6)'} : {}}><div className={`font-semibold`} style={{color: isMe ? 'white' : accentColor}}>{msg.replyTo.sender === 'me' ? 'You' : activeChat.name}</div><div className="truncate">{msg.replyTo.text}</div></div>}
                                            
                                            {msg.selfDestructTime > 0 && (
                                                <div className="flex items-center gap-1 text-xs text-red-500 mb-1 font-bold"><Flame size={12} className="animate-pulse" /> Self-destructing</div>
                                            )}

                                            {/* Content Types */}
                                            {msg.type === 'image' && msg.fileUrl ? (
                                                <img src={msg.fileUrl} className="rounded-lg mb-1 max-w-full max-h-64 object-cover" />
                                            ) : msg.type === 'sticker' ? (
                                                <img src={msg.fileUrl} className="w-32 h-32 mb-1" />
                                            ) : msg.type === 'gif' ? (
                                                <img src={msg.fileUrl} className="rounded-lg mb-1 max-w-full max-h-48 object-cover" />
                                            ) : msg.type === 'poll' ? (
                                                <div className="min-w-[200px] sm:min-w-[250px]">
                                                    <div className="font-bold mb-2">{msg.question}</div>
                                                    <div className="flex flex-col gap-2">
                                                        {msg.options.map(opt => (
                                                            <button key={opt.id} onClick={() => handleVote(msg.id, opt.id)} className={`relative overflow-hidden w-full text-left px-3 py-2 rounded border transition ${opt.voted ? 'border-accent' : 'border-transparent bg-black/5 hover:bg-black/10'}`}>
                                                                {opt.voted && <div className="absolute inset-0 opacity-20 bg-accent" style={{width: `${(opt.votes / Math.max(1, msg.options.reduce((a,b)=>a+b.votes,0))) * 100}%`}}></div>}
                                                                <div className="relative flex justify-between z-10"><span>{opt.text}</span>{opt.voted && <CheckCircle size={16} className="text-accent" />}</div>
                                                                <div className="relative z-10 text-xs opacity-70 mt-1">{Math.round((opt.votes / Math.max(1, msg.options.reduce((a,b)=>a+b.votes,0))) * 100)}% ({opt.votes})</div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <div className="text-xs opacity-60 mt-2">{msg.options.reduce((a,b)=>a+b.votes,0)} votes</div>
                                                </div>
                                            ) : msg.type === 'game' ? (
                                                <div className="min-w-[200px] flex flex-col items-center p-2 bg-black/5 rounded">
                                                    <div className="font-bold mb-2 flex items-center gap-2"><Gamepad2 size={16}/> Tic Tac Toe</div>
                                                    <div className="grid grid-cols-3 gap-1">
                                                        {msg.gameState.board.map((cell, i) => (
                                                            <button key={i} onClick={() => handleGameMove(msg.id, i)} disabled={!!cell || !!msg.gameState.winner} className="w-12 h-12 bg-white rounded flex items-center justify-center text-xl font-bold border border-gray-200 text-black">{cell}</button>
                                                        ))}
                                                    </div>
                                                    <div className="mt-2 text-xs font-bold">{msg.gameState.winner ? `Winner: ${msg.gameState.winner}!` : `Next: ${msg.gameState.xIsNext ? 'X' : 'O'}`}</div>
                                                </div>
                                            ) : (
                                                <div className="mr-8 pb-1 inline-block break-words selection-accent"><SpoilerText text={msg.text} /></div>
                                            )}
                                            
                                            <div className="float-right flex items-center gap-1 ml-2 mt-2 select-none h-3 relative top-0.5">
                                                {msg.isEdited && <span className={`text-[10px] ${subTextClass}`}>edited</span>}
                                                <span className={`text-[11px] ${isMe ? 'text-green-800/60' : 'text-gray-400'} ${darkMode && isMe ? 'text-gray-300' : ''}`}>{msg.time.split(' ')[0]}</span>
                                                {isMe && (msg.status === 'read' ? <CheckCheck className={`w-3.5 h-3.5 ${darkMode ? 'text-blue-300' : 'text-[#53bdeb]'}`} /> : <Check className="w-3.5 h-3.5 text-gray-400" />)}
                                                {activeChat.type === 'channel' && msg.views > 0 && (
                                                    <span className="flex items-center gap-0.5 text-[10px] text-gray-400 ml-1">
                                                        <Eye size={10} /> {msg.views > 1000 ? (msg.views/1000).toFixed(1) + 'k' : msg.views}
                                                    </span>
                                                )}
                                            </div>
                                            {msg.reactions.length > 0 && <div className={`absolute -bottom-5 ${isMe ? 'right-0' : 'left-0'} flex gap-1 z-10`}>{msg.reactions.map((r, i) => (<button key={i} onClick={(e) => {e.stopPropagation(); handleReactionClick(r.emoji)}} className="bg-white border px-1.5 rounded-full text-xs shadow-sm text-black">{r.emoji} {r.count > 1 && r.count}</button>))}</div>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex items-center gap-1 px-4 py-2 bg-white w-max rounded-lg rounded-tl-none shadow-sm ml-2 animate-message">
                            <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input */}
              {activeChat.blocked ? (
                  <div className={`p-4 text-center border-t ${sidebarBg} ${borderClass}`}><div className="text-red-500 font-medium">You blocked this user</div><button onClick={() => handleChatAction('block', activeChat.id)} className="text-sm mt-1 hover:underline text-accent">Unblock</button></div>
              ) : activeChat.type === 'channel' && activeChat.role !== 'admin' ? (
                  <div className={`p-3 border-t flex justify-center ${sidebarBg} ${borderClass}`}>
                      <button onClick={handleMuteToggle} className={`px-8 py-2 rounded-lg text-sm font-medium uppercase transition ${activeChat.muted ? 'text-accent bg-blue-50' : 'text-gray-500 hover:bg-gray-100'}`}>{activeChat.muted ? 'Unmute' : 'Mute'}</button>
                  </div>
              ) : (
                <div className={`px-2 py-2 z-10 max-w-[100%] mx-auto w-full md:px-[10%] ${sidebarBg} relative`}>
                    {editingMessageId && <div className={`flex items-center justify-between px-4 py-2 border-l-2 mb-2 border-accent ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}><div className="flex flex-col text-sm ml-2"><span className="font-semibold flex items-center gap-1 text-accent"><Edit3 size={14} /> Edit Message</span><span className="text-gray-500 truncate">{chats.find(c => c.id === activeChatId)?.messages.find(m => m.id === editingMessageId)?.text}</span></div><button onClick={() => { setEditingMessageId(null); setInputText(""); }}><X className="w-4 h-4" /></button></div>}
                    {replyTo && <div className={`flex items-center justify-between px-4 py-2 border-l-2 mb-2 border-accent ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}><div className="flex flex-col text-sm ml-2"><span className="font-semibold text-accent">Reply to {replyTo.sender === 'me' ? 'You' : activeChat.name}</span><span className="text-gray-500 truncate">{replyTo.text}</span></div><button onClick={() => setReplyTo(null)}><X className="w-4 h-4" /></button></div>}
                    
                    {/* Attach Menu */}
                    {isAttachMenuOpen && (
                        <div className={`absolute bottom-16 left-2 w-48 rounded-xl shadow-xl border py-2 z-50 animate-scale-in flex flex-col ${sidebarBg} ${borderClass}`}>
                            <button onClick={() => { fileInputRef.current.click(); setIsAttachMenuOpen(false); }} className={`flex items-center gap-3 px-4 py-2.5 transition text-[15px] ${hoverClass} ${textClass}`}><ImageIcon className="w-5 h-5 text-blue-500" /> Photo or Video</button>
                            <button onClick={() => { setIsDrawingOpen(true); setIsAttachMenuOpen(false); }} className={`flex items-center gap-3 px-4 py-2.5 transition text-[15px] ${hoverClass} ${textClass}`}><PenTool className="w-5 h-5 text-orange-500" /> Draw</button>
                            <button onClick={() => { handleSendMessage('', 'game'); setIsAttachMenuOpen(false); }} className={`flex items-center gap-3 px-4 py-2.5 transition text-[15px] ${hoverClass} ${textClass}`}><Gamepad2 className="w-5 h-5 text-purple-500" /> Game</button>
                            <button className={`flex items-center gap-3 px-4 py-2.5 transition text-[15px] ${hoverClass} ${textClass}`}><Film className="w-5 h-5 text-blue-400" /> File</button>
                            <button onClick={() => { setInputText(prev => prev + " ||spoiler||"); setIsAttachMenuOpen(false); inputRef.current.focus(); }} className={`flex items-center gap-3 px-4 py-2.5 transition text-[15px] ${hoverClass} ${textClass}`}><Eye className="w-5 h-5 text-gray-500" /> Spoiler</button>
                            {activeChat.type === 'group' && (
                                <button onClick={() => { setPollModalOpen(true); setIsAttachMenuOpen(false); }} className={`flex items-center gap-3 px-4 py-2.5 transition text-[15px] ${hoverClass} ${textClass}`}><BarChart2 className="w-5 h-5 text-yellow-500" /> Poll</button>
                            )}
                        </div>
                    )}

                    {/* Timer Menu */}
                    {isTimerMenuOpen && (
                        <div className={`absolute bottom-16 right-12 w-32 rounded-xl shadow-xl border py-2 z-50 animate-scale-in flex flex-col ${sidebarBg} ${borderClass}`}>
                            <div className="px-4 py-1 text-xs text-gray-500 font-bold uppercase">Self-Destruct</div>
                            {[0, 5, 10, 30, 60].map(time => (
                                <button key={time} onClick={() => { setSelfDestructTime(time); setIsTimerMenuOpen(false); }} className={`flex items-center justify-between px-4 py-2 text-sm ${hoverClass} ${textClass}`}><span>{time === 0 ? "Off" : `${time}s`}</span>{selfDestructTime === time && <Check size={14} className="text-accent" />}</button>
                            ))}
                        </div>
                    )}

                    {/* Emoji/Sticker/GIF Picker */}
                    {showEmojiPicker && (
                      <div className={`absolute bottom-full left-0 mb-2 rounded-xl shadow-xl border w-80 h-72 overflow-hidden flex flex-col animate-scale-in z-50 ${sidebarBg} ${borderClass}`} onClick={(e) => e.stopPropagation()}>
                        <div className="flex border-b">
                            {['emoji', 'sticker', 'gif'].map(tab => (
                                <button key={tab} onClick={() => setPickerTab(tab)} className={`flex-1 py-2 text-xs font-bold uppercase ${pickerTab === tab ? 'border-b-2 border-accent text-accent' : 'text-gray-500'}`}>{tab}</button>
                            ))}
                        </div>
                        <div className="flex-1 overflow-y-auto p-2">
                            {pickerTab === 'emoji' && <div className="grid grid-cols-8 gap-1">{COMMON_EMOJIS.map((emoji) => <button key={emoji} onClick={() => { setInputText(prev => prev + emoji); inputRef.current.focus(); }} className={`w-8 h-8 flex items-center justify-center text-xl rounded-md transition ${hoverClass}`}>{emoji}</button>)}</div>}
                            {pickerTab === 'sticker' && <div className="grid grid-cols-3 gap-2">{STICKERS.map((s, i) => <img key={i} src={s} onClick={() => handleSendMessage(s, 'sticker')} className="w-full h-auto cursor-pointer hover:scale-105 transition" />)}</div>}
                            {pickerTab === 'gif' && <div className="grid grid-cols-2 gap-2">{GIFS.map((g, i) => <img key={i} src={g} onClick={() => handleSendMessage(g, 'gif')} className="w-full h-auto rounded cursor-pointer hover:scale-105 transition" />)}</div>}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-end gap-2 w-full">
                        <button onClick={(e) => { e.stopPropagation(); setIsAttachMenuOpen(!isAttachMenuOpen); }} className={`p-3 text-gray-500 hover:bg-gray-100 rounded-full transition transform ${isAttachMenuOpen ? 'rotate-45' : ''}`}><Paperclip className="w-6 h-6" /></button>
                        <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => { if(e.target.files[0]) setSelectedFile(e.target.files[0]); }} />
                        <div className={`flex-1 relative rounded-2xl flex items-center pr-2 ${darkMode ? 'bg-[#1c1c1d]' : 'bg-white'}`}>
                            <input ref={inputRef} type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder={editingMessageId ? "Edit message..." : "Message"} className={`flex-1 bg-transparent border-none outline-none px-4 py-3 min-w-0 ${textClass}`} />
                            <button onClick={(e) => { e.stopPropagation(); setIsTimerMenuOpen(!isTimerMenuOpen); }} className={`p-1.5 rounded-full hover:bg-gray-200 transition ${selfDestructTime > 0 ? 'text-red-500' : 'text-gray-400'}`}><Clock size={18} /></button>
                        </div>
                        {inputText || selectedFile ? (
                            <button onClick={() => handleSendMessage()} className="p-3 hover:opacity-90 rounded-full text-white bg-accent">{editingMessageId ? <Check className="w-6 h-6" /> : <Send className="w-6 h-6 fill-current" />}</button>
                        ) : (
                            <button onClick={() => setIsRecording(!isRecording)} className={`p-3 rounded-full ${isRecording ? 'text-red-500 bg-red-50' : 'text-gray-500'}`}><Mic className="w-6 h-6" /></button>
                        )}
                        <button onClick={(e) => { e.stopPropagation(); setShowEmojiPicker(!showEmojiPicker); }} className={`p-3 transition rounded-full shrink-0 ${hoverClass} ${showEmojiPicker ? 'text-accent' : 'text-gray-400 hover:text-gray-500'}`}><Smile className="w-6 h-6" /></button>
                    </div>
                </div>
              )}
            </>
          ) : (
              <div className={`flex-1 flex flex-col items-center justify-center ${darkMode ? 'bg-[#0f0f0f]' : 'bg-[#99ba92]'}`}>
                  <div className="bg-black/20 text-white px-4 py-1 rounded-full text-sm">Select a chat to start messaging</div>
              </div>
          )}
        </div>

        {/* --- RIGHT PROFILE SIDEBAR --- */}
        {isProfileOpen && activeChat && activeChatId !== 0 && (
            <div className={`fixed inset-0 z-50 md:relative md:z-20 md:w-[300px] border-l flex flex-col animate-scale-in ${sidebarBg} ${borderClass}`}>
                {/* Header */}
                <div className="flex items-center gap-4 p-4 border-b">
                    <button onClick={() => setIsProfileOpen(false)}><X className="w-6 h-6 text-gray-500" /></button>
                    <span className={`font-semibold ${textClass}`}>{activeChat.type === 'private' ? 'User Info' : activeChat.type === 'group' ? 'Group Info' : 'Channel Info'}</span>
                </div>
                
                {/* Profile Cover/Avatar */}
                <div className="p-6 flex flex-col items-center border-b">
                     <div className="w-24 h-24 rounded-full mb-4 overflow-hidden relative">
                         {activeChat.avatar === 'group' ? (
                            <div className="w-full h-full bg-orange-400 flex items-center justify-center"><Users className="w-12 h-12 text-white" /></div>
                         ) : activeChat.avatar === 'channel' ? (
                            <div className="w-full h-full bg-blue-500 flex items-center justify-center"><Megaphone className="w-12 h-12 text-white" /></div>
                         ) : (
                            <img src={activeChat.avatar} className="w-full h-full object-cover" />
                         )}
                     </div>
                    <h2 className={`text-xl font-bold ${textClass}`}>{activeChat.name}</h2>
                    <span className="text-gray-500 text-sm">
                        {activeChat.online ? 'online' : 
                         activeChat.type === 'private' ? 'last seen recently' : 
                         activeChat.type === 'group' ? `${activeChat.members} members` : 
                         `${activeChat.subscribers} subscribers`}
                    </span>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 flex flex-col gap-4 border-b">
                        {/* Info Rows */}
                        {activeChat.type === 'channel' && activeChat.description && (
                            <div className="flex gap-4">
                                <Info className="w-6 h-6 text-gray-400 flex-shrink-0" />
                                <div>
                                    <p className={textClass}>{activeChat.description}</p>
                                    <span className="text-xs text-gray-400">Description</span>
                                </div>
                            </div>
                        )}
                        
                        {activeChat.type === 'channel' && activeChat.link && (
                            <div className="flex gap-4 items-center cursor-pointer hover:bg-gray-50 p-1 -ml-1 rounded">
                                <LinkIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className={`text-accent truncate`}>{activeChat.link}</p>
                                    <span className="text-xs text-gray-400">Link</span>
                                </div>
                                <Copy className="w-4 h-4 text-gray-400" />
                            </div>
                        )}

                        <div className="flex gap-4 items-center justify-between cursor-pointer">
                            <div className="flex gap-4 items-center">
                                <Bell className="w-6 h-6 text-gray-400" />
                                <span className={textClass}>Notifications</span>
                            </div>
                            <div className={`w-10 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${activeChat.muted ? 'bg-gray-300' : 'bg-accent'}`} onClick={handleMuteToggle}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${activeChat.muted ? '' : 'translate-x-5'}`}></div>
                            </div>
                        </div>

                        {/* Actions */}
                        {activeChat.type === 'private' ? (
                            <div className="flex gap-4 items-center cursor-pointer mt-2" onClick={() => handleChatAction('block', activeChat.id)}><Ban className={`w-6 h-6 ${activeChat.blocked ? 'text-red-500' : 'text-gray-400'}`} /><span className={activeChat.blocked ? 'text-red-500' : textClass}>{activeChat.blocked ? 'Unblock User' : 'Block User'}</span></div>
                        ) : (
                            <div className="flex gap-4 items-center cursor-pointer text-red-500 mt-2" onClick={() => handleChatAction('leave', activeChat.id)}><LogOut className="w-6 h-6" /><span>Leave {activeChat.type === 'group' ? 'Group' : 'Channel'}</span></div>
                        )}
                        <div className="flex gap-4 items-center text-red-500 cursor-pointer" onClick={() => handleChatAction('delete', activeChat.id)}><Trash2 className="w-6 h-6" /><span>Delete Chat</span></div>
                    </div>

                    {/* Shared Media */}
                    <div className="p-2">
                        <div className="flex items-center gap-2 px-2 py-2 text-sm font-semibold text-gray-500"><Grid size={16} /> Shared Media</div>
                        <div className="grid grid-cols-3 gap-1">
                            {activeChat.messages.filter(m => m.type === 'image' && m.fileUrl).map(m => (
                                <img key={m.id} src={m.fileUrl} className="w-full h-24 object-cover cursor-pointer hover:opacity-80" />
                            ))}
                            {activeChat.messages.filter(m => m.type === 'image').length === 0 && <div className="col-span-3 text-center text-xs text-gray-400 py-4">No shared media</div>}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* ... (Forward Modal, Context Menus, etc. remain the same) ... */}
        {forwardState.isOpen && (
            <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
                <div className={`w-[90%] max-w-sm max-h-[80vh] flex flex-col rounded-xl shadow-2xl ${sidebarBg}`}>
                    <div className={`p-4 border-b flex justify-between items-center ${borderClass}`}><h3 className={`font-bold ${textClass}`}>Forward to...</h3><button onClick={() => setForwardState({ isOpen: false, messageId: null })}><X className={subTextClass} /></button></div>
                    <div className="overflow-y-auto p-2">
                        {chats.map(chat => (
                            <div key={chat.id} onClick={() => handleForwardMessage(chat.id)} className={`flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg ${hoverClass}`}>
                                <div className="relative shrink-0">
                                   {chat.id === 0 ? <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent"><Bookmark className="w-5 h-5 text-white" /></div> : <img src={chat.avatar === 'group' || chat.avatar === 'channel' ? '' : chat.avatar} className="w-10 h-10 rounded-full bg-gray-200 object-cover" alt={chat.name} />}
                                   {(chat.avatar === 'group' || chat.avatar === 'channel') && <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">{chat.name[0]}</div>}
                                </div>
                                <div className="flex-1 min-w-0"><h3 className={`font-medium ${textClass}`}>{chat.name}</h3></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {msgContextMenu.visible && (
             <div className="fixed z-50 bg-white rounded-lg shadow-xl py-2 min-w-[160px] animate-scale-in" style={{top: msgContextMenu.y, left: msgContextMenu.x}}>
                 <div className="flex justify-between px-2 pb-2 mb-1 border-b border-gray-100 gap-1 overflow-x-auto no-scrollbar">
                    {COMMON_EMOJIS.slice(0, 5).map(emoji => (<button key={emoji} onClick={() => handleReactionClick(emoji)} className="w-8 h-8 text-2xl hover:scale-125 transition transform flex-shrink-0">{emoji}</button>))}
                 </div>
                 <button onClick={() => handleMessageAction('reply', msgContextMenu.messageId)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-2 items-center text-sm text-gray-700"><Reply size={16}/> Reply</button>
                 <button onClick={() => handleMessageAction('edit', msgContextMenu.messageId)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-2 items-center text-sm text-gray-700"><Edit3 size={16}/> Edit</button>
                 <button onClick={() => handleMessageAction('translate', msgContextMenu.messageId)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-2 items-center text-sm text-gray-700"><Languages size={16}/> Translate</button>
                 <button onClick={() => handleMessageAction('forward', msgContextMenu.messageId)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-2 items-center text-sm text-gray-700"><Forward size={16}/> Forward</button>
                 <button onClick={() => handleMessageAction('pin', msgContextMenu.messageId)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-2 items-center text-sm text-gray-700"><Pin size={16}/> Pin</button>
                 <button onClick={() => handleMessageAction('delete', msgContextMenu.messageId)} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-2 items-center text-sm text-red-500"><Trash2 size={16}/> Delete</button>
             </div>
        )}
        
        {chatListContextMenu.visible && (
             <div className="fixed z-50 bg-white rounded-lg shadow-xl py-2 min-w-[160px]" style={{top: chatListContextMenu.y, left: chatListContextMenu.x}}>
                 <button onClick={() => handleChatAction('archive')} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-2 items-center text-sm text-gray-700"><Archive size={16}/> {chats.find(c => c.id === chatListContextMenu.chatId)?.archived ? 'Unarchive' : 'Archive'}</button>
                 {(() => {
                     const targetChat = chats.find(c => c.id === chatListContextMenu.chatId);
                     if (!targetChat) return null;
                     return targetChat.type === 'private' ? (
                        <button onClick={() => handleChatAction('block')} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-2 items-center text-sm text-gray-700"><Ban size={16}/> {targetChat.blocked ? 'Unblock' : 'Block'}</button>
                     ) : (
                        <button onClick={() => handleChatAction('leave')} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-2 items-center text-sm text-red-500"><LogOut size={16}/> Leave {targetChat.type === 'group' ? 'Group' : 'Channel'}</button>
                     );
                 })()}
                 <button onClick={() => handleChatAction('delete')} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-2 items-center text-sm text-red-500"><Trash2 size={16}/> Delete</button>
             </div>
        )}

      </div>
    </div>
  );
}
