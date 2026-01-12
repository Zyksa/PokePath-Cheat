import { useState, useCallback } from 'react';
import type { SaveData, PlayerStats, PokemonSpecie, TeamPokemon, TargetMode } from '@/types/save';
import { decodeSaveData, encodeSaveData } from '@/utils/saveUtils';
import { calculateStars } from '@/types/save';

export function useSaveEditor() {
  const [saveData, setSaveData] = useState<SaveData | null>(null);
  const [originalData, setOriginalData] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSave = useCallback((base64String: string) => {
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
      const decoded = decodeSaveData(base64String);
      
      if (decoded) {
        setSaveData(decoded);
        setOriginalData(base64String);
        setError(null);
      } else {
        setError('invalidFormat');
        setSaveData(null);
      }
      
      setIsLoading(false);
    }, 500);
  }, []);

  const updateGold = useCallback((value: number) => {
    if (!saveData) return;
    setSaveData({
      ...saveData,
      player: { ...saveData.player, gold: Math.max(0, value) },
    });
  }, [saveData]);

  const updatePlayerName = useCallback((name: string) => {
    if (!saveData) return;
    setSaveData({
      ...saveData,
      player: { ...saveData.player, name },
    });
  }, [saveData]);

  const updateTeamSlots = useCallback((slots: number) => {
    if (!saveData) return;
    setSaveData({
      ...saveData,
      player: { ...saveData.player, teamSlots: Math.max(1, Math.min(12, slots)) },
    });
  }, [saveData]);

  const updateRouteWaves = useCallback((routeIndex: number, waves: number) => {
    if (!saveData) return;
    const newRecords = [...saveData.player.records];
    newRecords[routeIndex] = Math.max(0, Math.min(100, waves));
    const newStars = calculateStars(newRecords);
    
    setSaveData({
      ...saveData,
      player: { 
        ...saveData.player, 
        records: newRecords,
        stars: newStars,
      },
    });
  }, [saveData]);

  const maxAllRoutes = useCallback(() => {
    if (!saveData) return;
    const newRecords = saveData.player.records.map(() => 100);
    const newStars = calculateStars(newRecords);
    
    setSaveData({
      ...saveData,
      player: { 
        ...saveData.player, 
        records: newRecords,
        stars: newStars,
      },
    });
  }, [saveData]);

  const resetAllRoutes = useCallback(() => {
    if (!saveData) return;
    const newRecords = saveData.player.records.map(() => 0);
    
    setSaveData({
      ...saveData,
      player: { 
        ...saveData.player, 
        records: newRecords,
        stars: 0,
      },
    });
  }, [saveData]);

  const togglePokemonShiny = useCallback((pokemonIndex: number, isBox: boolean = false) => {
    if (!saveData) return;
    
    if (isBox && saveData.box) {
      const newBox = [...saveData.box];
      if (newBox[pokemonIndex]) {
        newBox[pokemonIndex] = {
          ...newBox[pokemonIndex],
          shiny: !newBox[pokemonIndex].shiny,
        };
      }
      setSaveData({ ...saveData, box: newBox });
    } else if (saveData.team) {
      const newTeam = [...saveData.team];
      if (newTeam[pokemonIndex]) {
        newTeam[pokemonIndex] = {
          ...newTeam[pokemonIndex],
          shiny: !newTeam[pokemonIndex].shiny,
        };
      }
      setSaveData({ ...saveData, team: newTeam });
    }
  }, [saveData]);

  const setAllShiny = useCallback((shiny: boolean) => {
    if (!saveData) return;
    
    const newBox = saveData.box?.map(p => ({ ...p, shiny })) || [];
    const newTeam = saveData.team?.map(p => ({ ...p, shiny })) || [];
    
    setSaveData({ ...saveData, box: newBox, team: newTeam });
  }, [saveData]);

  const updatePokemonLevel = useCallback((pokemonIndex: number, level: number, isBox: boolean = false) => {
    if (!saveData) return;
    const newLevel = Math.max(1, Math.min(100, level));
    
    if (isBox && saveData.box) {
      const newBox = [...saveData.box];
      if (newBox[pokemonIndex]) {
        newBox[pokemonIndex] = { ...newBox[pokemonIndex], lvl: newLevel };
      }
      setSaveData({ ...saveData, box: newBox });
    } else if (saveData.team) {
      const newTeam = [...saveData.team];
      if (newTeam[pokemonIndex]) {
        newTeam[pokemonIndex] = { ...newTeam[pokemonIndex], lvl: newLevel };
      }
      setSaveData({ ...saveData, team: newTeam });
    }
  }, [saveData]);

  const maxAllLevels = useCallback(() => {
    if (!saveData) return;
    
    const newBox = saveData.box?.map(p => ({ ...p, lvl: 100 })) || [];
    const newTeam = saveData.team?.map(p => ({ ...p, lvl: 100 })) || [];
    
    setSaveData({ ...saveData, box: newBox, team: newTeam });
  }, [saveData]);

  const addPokemon = useCallback((specie: PokemonSpecie, toBox: boolean = false, shiny: boolean = false, level: number = 1) => {
    if (!saveData) return;
    
    const newPokemon: TeamPokemon = {
      favorite: false,
      lvl: Math.max(1, Math.min(100, level)),
      specie: { ...specie },
      targetMode: 'first',
      shiny,
    };
    
    if (toBox) {
      const newBox = [...(saveData.box || []), newPokemon];
      setSaveData({ ...saveData, box: newBox });
    } else {
      const newTeam = [...(saveData.team || []), newPokemon];
      setSaveData({ ...saveData, team: newTeam });
    }
  }, [saveData]);

  const removePokemon = useCallback((pokemonIndex: number, isBox: boolean = false) => {
    if (!saveData) return;
    
    if (isBox && saveData.box) {
      const newBox = saveData.box.filter((_, i) => i !== pokemonIndex);
      setSaveData({ ...saveData, box: newBox });
    } else if (saveData.team) {
      const newTeam = saveData.team.filter((_, i) => i !== pokemonIndex);
      setSaveData({ ...saveData, team: newTeam });
    }
  }, [saveData]);

  const updatePokemonTargetMode = useCallback((pokemonIndex: number, targetMode: TargetMode, isBox: boolean = false) => {
    if (!saveData) return;
    
    if (isBox && saveData.box) {
      const newBox = [...saveData.box];
      if (newBox[pokemonIndex]) {
        newBox[pokemonIndex] = { ...newBox[pokemonIndex], targetMode };
      }
      setSaveData({ ...saveData, box: newBox });
    } else if (saveData.team) {
      const newTeam = [...saveData.team];
      if (newTeam[pokemonIndex]) {
        newTeam[pokemonIndex] = { ...newTeam[pokemonIndex], targetMode };
      }
      setSaveData({ ...saveData, team: newTeam });
    }
  }, [saveData]);

  const togglePokemonFavorite = useCallback((pokemonIndex: number, isBox: boolean = false) => {
    if (!saveData) return;
    
    if (isBox && saveData.box) {
      const newBox = [...saveData.box];
      if (newBox[pokemonIndex]) {
        newBox[pokemonIndex] = { ...newBox[pokemonIndex], favorite: !newBox[pokemonIndex].favorite };
      }
      setSaveData({ ...saveData, box: newBox });
    } else if (saveData.team) {
      const newTeam = [...saveData.team];
      if (newTeam[pokemonIndex]) {
        newTeam[pokemonIndex] = { ...newTeam[pokemonIndex], favorite: !newTeam[pokemonIndex].favorite };
      }
      setSaveData({ ...saveData, team: newTeam });
    }
  }, [saveData]);

  const toggleAchievement = useCallback((index: number) => {
    if (!saveData) return;
    
    const newAchievements = [...saveData.player.achievements];
    if (newAchievements[index]) {
      newAchievements[index] = {
        ...newAchievements[index],
        status: !newAchievements[index].status,
      };
    }
    
    setSaveData({
      ...saveData,
      player: { ...saveData.player, achievements: newAchievements },
    });
  }, [saveData]);

  const setAllAchievements = useCallback((unlocked: boolean) => {
    if (!saveData) return;
    
    const newAchievements = saveData.player.achievements.map(a => ({
      ...a,
      status: unlocked,
    }));
    
    setSaveData({
      ...saveData,
      player: { ...saveData.player, achievements: newAchievements },
    });
  }, [saveData]);

  const updateStat = useCallback((statKey: keyof PlayerStats, value: number) => {
    if (!saveData) return;
    
    setSaveData({
      ...saveData,
      player: {
        ...saveData.player,
        stats: {
          ...saveData.player.stats,
          [statKey]: Math.max(0, value),
        },
      },
    });
  }, [saveData]);

  const getEncodedSave = useCallback(() => {
    if (!saveData) return '';
    return encodeSaveData(saveData);
  }, [saveData]);

  const resetChanges = useCallback(() => {
    if (originalData) {
      loadSave(originalData);
    }
  }, [originalData, loadSave]);

  return {
    saveData,
    isLoading,
    error,
    loadSave,
    updateGold,
    updatePlayerName,
    updateTeamSlots,
    updateRouteWaves,
    maxAllRoutes,
    resetAllRoutes,
    togglePokemonShiny,
    setAllShiny,
    updatePokemonLevel,
    maxAllLevels,
    addPokemon,
    removePokemon,
    updatePokemonTargetMode,
    togglePokemonFavorite,
    toggleAchievement,
    setAllAchievements,
    updateStat,
    getEncodedSave,
    resetChanges,
  };
}
