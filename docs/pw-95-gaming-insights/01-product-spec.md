## User Story

As a visitor to the Gaming Insights Demo, I want to explore aggregated sportsbook data so that I can understand how the application transforms raw market data into analytics-focused insights.


## User Experience

### 1. User lands on the page

The user sees:

* Project title
* Short description of the demo
* Selected default sport
* A populated list of upcoming games
* Consensus metrics for each game

The page should immediately demonstrate value without requiring any user interaction.

### 2. User optionally changes the sport

The user can select a different sport and view updated results.

The sport selector is intended to support exploration and should not be required to use the application.

### 3. User explores game insights

For each game, the user can view:

* Teams
* Game start time
* Number of sportsbooks reporting
* Consensus moneyline
* Implied win probability
* Consensus spread
* Consensus total

### 4. User optionally expands a game

The user can view the underlying sportsbook data used to calculate the consensus metrics.

This allows the user to understand how raw sportsbook data is transformed into analytics-focused insights.


### Functional Requirements

#### FR-1: Default Data Load

The application shall load and display upcoming game insights for a default sport when the user first visits the page.

#### FR-2: Sport Selection

The application shall allow the user to select a supported sport and view updated game insights for that sport.

#### FR-3: Game Insight Summary

The application shall display a summary for each upcoming game that includes the participating teams, game start time, number of sportsbooks reporting, and calculated consensus metrics derived from available sportsbook data.

#### FR-5: Source Data Visibility

The application shall allow the user to view the underlying sportsbook data used to calculate consensus metrics for a game.

#### FR-6: Error Handling

The application shall display a user-friendly message when game data cannot be retrieved.