import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Enable CORS
app.use(cors());
app.use(express.json());

// In-memory database
const users: Record<string, any> = {};
const clientProfiles: Record<string, any> = {};
const freelancerProfiles: Record<string, any> = {};
const serviceRequests: Record<string, any> = {};
const bids: Record<string, any> = {};
const messages: Record<string, any> = {};

// Validation schemas
const UserSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  password: z.string().min(8),
  userType: z.enum(['client', 'freelancer'])
});

const ClientProfileSchema = z.object({
  companyName: z.string().optional(),
  description: z.string().optional()
});

const FreelancerProfileSchema = z.object({
  headline: z.string().min(5),
  description: z.string().min(20),
  categoryId: z.string(),
  skills: z.array(z.string()).min(1)
});

const ServiceRequestSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  categoryId: z.string(),
  skillsRequired: z.array(z.string()).min(1),
  budgetMin: z.number().positive(),
  budgetMax: z.number().positive(),
  deadlineDays: z.number().positive()
});

// Routes
app.post('/api/users', async (req, res) => {
  try {
    const userData = UserSchema.parse(req.body);
    const userId = uuidv4();
    
    users[userId] = {
      id: userId,
      ...userData,
      createdAt: new Date()
    };

    res.status(201).json({ id: userId, ...userData });
  } catch (error) {
    res.status(400).json({ error: 'Invalid user data' });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = Object.values(users).find(u => u.email === email);
  
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  res.json({
    accessToken: user.id,
    tokenType: 'bearer',
    userId: user.id,
    userType: user.userType
  });
});

app.post('/api/client-profile', (req, res) => {
  try {
    const userId = req.headers.authorization?.split(' ')[1];
    if (!userId || !users[userId] || users[userId].userType !== 'client') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const profileData = ClientProfileSchema.parse(req.body);
    clientProfiles[userId] = profileData;
    
    res.status(201).json(profileData);
  } catch (error) {
    res.status(400).json({ error: 'Invalid profile data' });
  }
});

app.post('/api/freelancer-profile', (req, res) => {
  try {
    const userId = req.headers.authorization?.split(' ')[1];
    if (!userId || !users[userId] || users[userId].userType !== 'freelancer') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const profileData = FreelancerProfileSchema.parse(req.body);
    freelancerProfiles[userId] = profileData;
    
    res.status(201).json(profileData);
  } catch (error) {
    res.status(400).json({ error: 'Invalid profile data' });
  }
});

app.post('/api/service-requests', (req, res) => {
  try {
    const userId = req.headers.authorization?.split(' ')[1];
    if (!userId || !users[userId] || users[userId].userType !== 'client') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const requestData = ServiceRequestSchema.parse(req.body);
    const requestId = uuidv4();
    const now = new Date();
    
    // Simulate AI enhancement
    const enhancedDescription = `Enhanced: ${requestData.description}\n\nThis project requires expertise in ${requestData.skillsRequired.join(', ')}.`;
    
    const serviceRequest = {
      id: requestId,
      ...requestData,
      clientId: userId,
      createdAt: now,
      enhancedDescription,
      status: 'open',
      expiresAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    };
    
    serviceRequests[requestId] = serviceRequest;
    res.status(201).json(serviceRequest);
  } catch (error) {
    res.status(400).json({ error: 'Invalid request data' });
  }
});

app.get('/api/service-requests', (req, res) => {
  const userId = req.headers.authorization?.split(' ')[1];
  if (!userId || !users[userId]) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  if (users[userId].userType === 'client') {
    // Return client's own requests
    const clientRequests = Object.values(serviceRequests).filter(
      (req: any) => req.clientId === userId
    );
    res.json(clientRequests);
  } else {
    // Return all open requests for freelancers
    const openRequests = Object.values(serviceRequests).filter(
      (req: any) => req.status === 'open'
    );
    res.json(openRequests);
  }
});

app.post('/api/bids', (req, res) => {
  try {
    const userId = req.headers.authorization?.split(' ')[1];
    if (!userId || !users[userId] || users[userId].userType !== 'freelancer') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const { serviceRequestId, amount, deliveryTimeDays, proposal } = req.body;
    
    if (!serviceRequests[serviceRequestId]) {
      return res.status(404).json({ error: 'Service request not found' });
    }
    
    if (serviceRequests[serviceRequestId].status !== 'open') {
      return res.status(400).json({ error: 'This service request is no longer accepting bids' });
    }
    
    const bidId = uuidv4();
    const bid = {
      id: bidId,
      serviceRequestId,
      amount,
      deliveryTimeDays,
      proposal,
      freelancerId: userId,
      createdAt: new Date(),
      status: 'pending'
    };
    
    bids[bidId] = bid;
    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ error: 'Invalid bid data' });
  }
});

app.get('/api/bids', (req, res) => {
  const userId = req.headers.authorization?.split(' ')[1];
  if (!userId || !users[userId]) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  const { serviceRequestId } = req.query;
  
  if (serviceRequestId) {
    if (serviceRequests[serviceRequestId as string]) {
      const request = serviceRequests[serviceRequestId as string];
      if (request.clientId === userId || users[userId].userType === 'freelancer') {
        const requestBids = Object.values(bids).filter(
          (bid: any) => bid.serviceRequestId === serviceRequestId
        );
        return res.json(requestBids);
      }
    }
    return res.status(403).json({ error: 'Not authorized to view these bids' });
  }
  
  if (users[userId].userType === 'freelancer') {
    // Return freelancer's own bids
    const userBids = Object.values(bids).filter(
      (bid: any) => bid.freelancerId === userId
    );
    res.json(userBids);
  } else {
    // Return bids on client's requests
    const userRequests = Object.values(serviceRequests)
      .filter((req: any) => req.clientId === userId)
      .map((req: any) => req.id);
    const requestBids = Object.values(bids).filter(
      (bid: any) => userRequests.includes(bid.serviceRequestId)
    );
    res.json(requestBids);
  }
});

app.put('/api/bids/:bidId/accept', (req, res) => {
  try {
    const userId = req.headers.authorization?.split(' ')[1];
    if (!userId || !users[userId] || users[userId].userType !== 'client') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const { bidId } = req.params;
    if (!bids[bidId]) {
      return res.status(404).json({ error: 'Bid not found' });
    }
    
    const bid = bids[bidId];
    const requestId = bid.serviceRequestId;
    
    if (!serviceRequests[requestId]) {
      return res.status(404).json({ error: 'Service request not found' });
    }
    
    const request = serviceRequests[requestId];
    
    if (request.clientId !== userId) {
      return res.status(403).json({ error: 'Not authorized to accept this bid' });
    }
    
    if (request.status !== 'open') {
      return res.status(400).json({ error: 'This service request is no longer open' });
    }
    
    // Update bid and service request status
    bid.status = 'accepted';
    request.status = 'in_progress';
    
    // Reject all other bids
    Object.values(bids).forEach((otherBid: any) => {
      if (otherBid.serviceRequestId === requestId && otherBid.id !== bidId) {
        otherBid.status = 'rejected';
      }
    });
    
    res.json({ message: 'Bid accepted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

// WebSocket handling
io.on('connection', (socket) => {
  const userId = socket.handshake.auth.userId;
  
  if (!userId || !users[userId]) {
    socket.disconnect();
    return;
  }
  
  socket.join(userId);
  
  socket.on('message', async (data) => {
    try {
      const { content, receiverId } = data;
      
      if (!content || !receiverId) {
        socket.emit('error', { message: 'Invalid message format' });
        return;
      }
      
      const messageId = uuidv4();
      const message = {
        id: messageId,
        content,
        senderId: userId,
        receiverId,
        createdAt: new Date(),
        read: false
      };
      
      messages[messageId] = message;
      
      // Send to receiver if online
      io.to(receiverId).emit('message', message);
      
    } catch (error) {
      socket.emit('error', { message: 'Failed to send message' });
    }
  });
  
  socket.on('disconnect', () => {
    socket.leave(userId);
  });
});

app.get('/api/messages/:userId', (req, res) => {
  try {
    const currentUserId = req.headers.authorization?.split(' ')[1];
    const { userId } = req.params;
    
    if (!currentUserId || !users[currentUserId]) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    if (currentUserId !== userId && 
        !Object.values(messages).some(
          (msg: any) => msg.senderId === userId && msg.receiverId === currentUserId
        )) {
      return res.status(403).json({ error: 'Not authorized to view these messages' });
    }
    
    // Get conversation between current user and specified user
    const conversation = Object.values(messages).filter(
      (msg: any) => 
        (msg.senderId === currentUserId && msg.receiverId === userId) ||
        (msg.senderId === userId && msg.receiverId === currentUserId)
    );
    
    // Mark messages as read
    Object.values(messages).forEach((msg: any) => {
      if (msg.senderId === userId && msg.receiverId === currentUserId) {
        msg.read = true;
      }
    });
    
    res.json(conversation);
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

// AI enhancement endpoint
app.post('/api/enhance-description', (req, res) => {
  try {
    const userId = req.headers.authorization?.split(' ')[1];
    if (!userId || !users[userId]) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text field is required' });
    }
    
    // Simulate AI enhancement
    const enhancedText = `Enhanced: ${text}\n\nThis project requires a skilled professional with attention to detail. The ideal candidate will have experience with similar projects and a portfolio demonstrating relevant work.`;
    
    res.json({
      original: text,
      enhanced: enhancedText
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});