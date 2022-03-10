import {useEffect, useState} from 'react';
import {Route, useHistory} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// component form 'libs'
// this path is indicated in 'paths' in global tsconfig.base.json
import {Header} from '@nx-dashboard/store/shared-ui';
import {formatRating} from '@nx-dashboard/store/util-formatters';

import classes from './app.module.scss';

import {StoreFeatureGameDetail} from '@nx-dashboard/store/feature-game-detail';
import {Game} from "@nx-dashboard/api/util-interfaces";
// import {Game} from '@nxegghead/api/util-interfaces';

// Types destructuring example
// export function NxWelcome({ title }: { title: string }) {

export function App() {
    const history = useHistory();

    const [state, setState] = useState<{
        data: Game[];
        loadingState: 'success' | 'error' | 'loading';
    }>({
        data: [],
        loadingState: 'success',
    });

    useEffect(() => {
        // we have wrapped setState into arrow f() in order to fix eslint error
        // we made a functional update 'setState(s => ...)'
        setState((s) => ({
            ...state,
            loadingState: 'loading',
        }));

        // the base url is indicated in 'proxy.config.json'
        // localhost:4200/api -> will be redirected to localhost:3333/api
        fetch('/api/games')
            .then((resp) => resp.json())
            .then((res) => {
                setState((s) => ({
                    ...state,
                    data: res,
                    loadingState: 'success',
                }));
            })
            .catch((err) => {
                setState((s) => ({
                    ...state,
                    loadingState: 'error',
                }));
            });
    }, []);

    return (
        <>
            <Header title="Board Game Hoard"/>
            <div className={classes['container']} data-testid="app-container">
                <div className={classes['games-layout']}>
                    {state.loadingState === 'loading'
                        // double nested ternary operator
                        ? 'Loading...'
                        : state.loadingState === 'error'
                            ? '<div>Error retrieving data</div>'
                            : state.data.map((game) => (
                                <Card key={game.id} className={classes['game-card']}
                                      onClick={() => history.push(`/game/${game.id}`)}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes['game-card-media']}
                                            image={game.image}
                                            title={game.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {game.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                component="p"
                                            >
                                                {game.description}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                component="p"
                                                className={classes['game-rating']}
                                            >
                                                <strong>Rating:</strong> {formatRating(game.rating)}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                </div>
            </div>

            <Route path="/game/:id" component={StoreFeatureGameDetail}/>
        </>
    );
}

export default App;
