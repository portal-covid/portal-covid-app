import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

function preventDefault(event) {
	event.preventDefault();
}
  
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
	},
	card: {
		backgroundColor: theme.palette.background.paper,
	}
}));

export default function VerticalLinearStepper() {
    const classes = useStyles();

    return (
		<React.Fragment>
			<Grid container className={classes.root} spacing={1}>
				<Grid item xs={12}>
					<Typography variant="h6">
						Administrativo
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Total
							</Typography>
							<Typography component="p" variant="h4">
								60
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Afast. Motivo Legal
							</Typography>
							<Typography component="p" variant="h4">
								3
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Afast. Grupo Risco
							</Typography>
							<Typography component="p" variant="h4">
								9
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								CEAP
							</Typography>
							<Typography component="p" variant="h4">
								14
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								CEAB
							</Typography>
							<Typography component="p" variant="h4">
								8
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} style={{marginTop: 30}}>
					<Typography variant="h6">
						Peritos
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Total
							</Typography>
							<Typography component="p" variant="h4">
								60
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Afast. Motivo Legal
							</Typography>
							<Typography component="p" variant="h4">
								3
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Afast. Grupo Risco
							</Typography>
							<Typography component="p" variant="h4">
								9
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} style={{marginTop: 30}}>
					<Typography variant="h6">
						Assistente Social
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Total
							</Typography>
							<Typography component="p" variant="h4">
								60
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Afast. Motivo Legal
							</Typography>
							<Typography component="p" variant="h4">
								3
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Afast. Grupo Risco
							</Typography>
							<Typography component="p" variant="h4">
								9
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} style={{marginTop: 30}}>
					<Typography variant="h6">
						Estagiários
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Total
							</Typography>
							<Typography component="p" variant="h4">
								60
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Afast. Motivo Legal
							</Typography>
							<Typography component="p" variant="h4">
								3
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Afast. Grupo Risco
							</Typography>
							<Typography component="p" variant="h4">
								9
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} style={{marginTop: 30}}>
					<Typography variant="h6">
						Temporários
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Total
							</Typography>
							<Typography component="p" variant="h4">
								60
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h2" variant="subtitle2" color="primary" gutterBottom>
								Afast. Motivo Legal
							</Typography>
							<Typography component="p" variant="h4">
								3
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={2}>
					<Card className={classes.card}>
						<CardContent>
							<Typography component="h4" variant="subtitle2" color="primary" gutterBottom>
								Afast. Grupo Risco
							</Typography>
							<Typography component="p" variant="h4">
								9
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
			
		</React.Fragment>
    );
}