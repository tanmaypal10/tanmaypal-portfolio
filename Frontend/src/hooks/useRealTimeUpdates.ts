import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSocket } from './useSocket';

export const useRealTimeUpdates = () => {
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    socket.on('gallery-updated', (data) => {
      console.log('Gallery update received:', data);
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    });

    socket.on('projects-updated', (data) => {
      console.log('Projects update received:', data);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    });

    socket.on('messages-updated', (data) => {
      console.log('Messages update received:', data);
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    });

    return () => {
      socket.off('gallery-updated');
      socket.off('projects-updated');
      socket.off('messages-updated');
    };
  }, [socket, queryClient]);
};
