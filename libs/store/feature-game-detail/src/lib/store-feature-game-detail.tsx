import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from "@material-ui/core/CardMedia";

import classes from './store-feature-game-detail.module.scss';
import {formatRating} from "@nx-dashboard/store/util-formatters";
import {Game} from "@nx-dashboard/api/util-interfaces";

type GameUrlParams = { id: string };

export interface StoreFeatureGameDetailProps extends RouteComponentProps<GameUrlParams> {
}

export const StoreFeatureGameDetail = (props: StoreFeatureGameDetailProps) => {
    const [state, setState] = useState<{
        data: Game| null;
        loadingState: 'success' | 'error' | 'loading';
    }>({
        data: null,
        loadingState: 'success',
    });

    useEffect(() => {
        setState({
            ...state,
            loadingState: 'loading',
        });

        const gameId = props.match.params.id;
        fetch(`/api/games/${gameId}`)
            .then((resp) => resp.json())
            .then((res) => {
                setState({
                    ...state,
                    data: res,
                    loadingState: 'success',
                });
            })
            .catch((err) => {
                setState({
                    ...state,
                    loadingState: 'error',
                });
            });
    }, [props.match.params.id]); // getting ID param from url; watching ID param all the time

    return (
        <div className="container">
            {state.loadingState === 'loading' ? (
                'Loading...'
            ) : state.loadingState === 'error' ? (
                <div>Error fetching data</div>
            ) : state.data == null ? (
                ''
            ) : (
                <Card>
                    <CardActionArea>
                        <CardMedia
                            className={classes['game-card-media']}
                            image={state.data.image}
                            title={state.data.name}/>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.match.params.id}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p"
                                        className={classes['game-rating']}>
                                <strong>Rating:</strong> {formatRating(state.data.rating)}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )}
        </div>
    );
};

export default StoreFeatureGameDetail;
