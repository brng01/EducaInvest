import { useState, useCallback, useEffect } from 'react';

// Using online placeholders for now. In a real app, these should be local files in /public/sounds/
const SOUNDS = {
    click: "https://rpg.hamsterrepublic.com/wiki-images/2/21/Collision8-Bit.ogg",
    success: "https://rpg.hamsterrepublic.com/wiki-images/d/db/Crush8-Bit.ogg",
    error: "https://rpg.hamsterrepublic.com/wiki-images/d/d7/Oddbounce.ogg",
    pop: "https://rpg.hamsterrepublic.com/wiki-images/4/43/Snap.ogg",
    coins: "https://rpg.hamsterrepublic.com/wiki-images/7/72/Metal_cling.ogg",
    fanfare: "https://rpg.hamsterrepublic.com/wiki-images/8/82/PowerUp.ogg",
};

type SoundType = keyof typeof SOUNDS;

export function useSound() {
    const [isMuted, setIsMuted] = useState(() => {
        return localStorage.getItem('educainvest_muted') === 'true';
    });

    const play = useCallback((type: SoundType) => {
        if (isMuted) return;

        try {
            const audio = new Audio(SOUNDS[type]);
            audio.volume = 0.5; // 50% volume to not be annoying
            audio.play().catch(e => console.warn("Audio play failed", e));
        } catch (error) {
            console.error("Audio error", error);
        }
    }, [isMuted]);

    const toggleMute = () => {
        setIsMuted(prev => {
            const newState = !prev;
            localStorage.setItem('educainvest_muted', String(newState));
            return newState;
        });
    };

    return { play, isMuted, toggleMute };
}
