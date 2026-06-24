import { useMemo, useRef, useState, useCallback } from 'react'
import { useGetGamesQuery } from '../../entities/game/game.api'
import { useInfiniteScroll } from '../../shared/hooks/useInfiniteScroll'
import { GAMES_PER_BATCH } from '../../shared/constants'
import { GameCard } from '../../entities/game/ui/GameCard'
import { Game } from '../../entities/game/game.types'
import './Home.scss'

export const Home = () => {
    // получаем данные с API
    const { data: games = [], isLoading } = useGetGamesQuery()

    // состояние поиска
    const [search, setSearch] = useState('')

    // выбранный тип игры
    const [selectedType, setSelectedType] = useState<string>('all')

    // сколько игр отображаем
    const [visibleCount, setVisibleCount] = useState(GAMES_PER_BATCH)

    // ref для infinite scroll
    const triggerRef = useRef<HTMLDivElement | null>(null)

    // фильтрация + поиск (O(n))
    const filteredGames = useMemo(() => {
        return games.filter((game: Game) => {
            const matchesSearch =
                game.gameName.toLowerCase().includes(search.toLowerCase())

            const matchesType =
                selectedType === 'all' || game.gameTypeID === selectedType

            return matchesSearch && matchesType
        })
    }, [games, search, selectedType])

    // определяем есть ли ещё что загружать
    const hasMore = visibleCount < filteredGames.length

    // функция подгрузки следующей порции
    const handleLoadMore = useCallback(() => {
        setVisibleCount((prev) => prev + GAMES_PER_BATCH)
    }, [])

    // подключаем infinite scroll
    useInfiniteScroll({
        //@ts-ignore
        triggerRef,
        onLoadMore: handleLoadMore,
        hasMore,
        isLoading,
    })

    const gameTypes = useMemo(() => {
        const types = new Set<string>()
        games.forEach((game) => types.add(game.gameTypeID))
        return Array.from(types)
    }, [games])

    return (
        <div className="home">

            {/* ===== Верхняя панель ===== */}
            <div className="home__top">

                <div className="home__filter">
                    <span className="home__label">Game Type</span>

                    <select
                        value={selectedType}
                        onChange={(e) => {
                            setSelectedType(e.target.value)
                            setVisibleCount(GAMES_PER_BATCH)
                        }}
                        className="home__select"
                    >
                        <option value="all">All</option>
                        {gameTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="home__search">
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setVisibleCount(GAMES_PER_BATCH)
                        }}
                        className="home__input"
                    />

                    <button className="home__search-btn">
                        SEARCH
                    </button>
                </div>
            </div>

    {/* ===== Заголовок провайдера ===== */
    }
    <div className="home__provider">
        <span className="home__provider-icon">💣</span>
        <span>Pragmatic Play</span>
    </div>

    {/* ===== Сетка игр ===== */
    }
    <div className="home__grid">
        {filteredGames.slice(0, visibleCount).map((game) => (
            <GameCard key={game.gameID} game={game}/>
        ))}
    </div>

    {/* Триггер для infinite scroll */
    }
    <div ref={triggerRef} className="home__observer"/>
</div>
)
}