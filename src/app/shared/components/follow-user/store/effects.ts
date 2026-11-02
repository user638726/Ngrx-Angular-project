import { inject } from "@angular/core";
import { FollowUserService } from "../service/follow-user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { followUserActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { ProfileInterface } from "../../../types/profile.interface";

export const followUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    followUserService = inject(FollowUserService),
  ) => {
    return actions$.pipe(
      ofType(followUserActions.followUser),

      switchMap(({isFollowing,username}) => {
        const profile$=isFollowing?followUserService.unfollowUser(username):followUserService.followUser(username)
        return profile$.pipe(
          map((profile:ProfileInterface) => {
            return followUserActions.followUserSuccess({ profile });
          }),

          catchError(() => {
            return of(followUserActions.followUserFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
