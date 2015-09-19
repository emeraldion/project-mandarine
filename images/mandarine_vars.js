
	/**
	 *	Mandarine game © 2002 Eidos Workshop
	 *	@author Claudio Procida
	 *	@version 2.01 (beta)
	 *	@date 16.59 27/06/2002
	 */

	/**
	 *	Constants
	 */

	var CLASSROOM_WIDTH = 13, CLASSROOM_HEIGHT = 10, CLASSROOM_INNER_HEIGHT = 8, STANDING = 1, CROUCHED = 0, MOVING_STEPS = 5;
	    TARGET = -2, DESK = -1, T_DESK = -3, WALL = -4, FREE_SPACE = -5, CLA_ID = 1, DO_ID = 3, RESPONSE_TIME = 75,
	    LATENCY_THRESHOLD = 500, MAX_ATTEMPTS = 5000, MATES_NUMBER = 3, MATES_START_X = 0, MATES_START_Y = 7,
	    START_X = 0, START_Y = 0, DO_START_X = 0, DO_START_Y = 5, UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3,
	    X_ORIGIN = 0, Y_ORIGIN = 410, X_SCALE = 60, Y_SCALE = 30, X_STEP = 12, Y_STEP = 6, FIELD_Y = 19,
	    CAMMEI = 3;

	var CLA_UP_0 = 'cla_up_0.gif',			CLA_LEFT_0 = 'cla_left_0.gif',
	    CLA_UP_1 = 'cla_up_1.gif',			CLA_LEFT_1 = 'cla_left_1.gif',
	    CLA_UP_3 = 'cla_up_3.gif',			CLA_LEFT_3 = 'cla_left_3.gif',
	    CLA_UP_4 = CLA_UP_2 = CLA_UP_0,		CLA_LEFT_4 = CLA_LEFT_2 = CLA_LEFT_0,
	    CLA_DOWN_0 = 'cla_down_0.gif',		CLA_RIGHT_0 = 'cla_right_0.gif',
	    CLA_DOWN_1 = 'cla_down_1.gif',		CLA_RIGHT_1 = 'cla_right_1.gif',
	    CLA_DOWN_3 = 'cla_down_3.gif',		CLA_RIGHT_3 = 'cla_right_3.gif',
	    CLA_DOWN_4 = CLA_DOWN_2 = CLA_DOWN_0,	CLA_RIGHT_4 = CLA_RIGHT_2 = CLA_RIGHT_0;

	var CLA_UP_CROUCHED = 'cla_up_crouched.gif',		CLA_UP_DEPLOYING = 'cla_up_deploying.gif',
	    CLA_RIGHT_CROUCHED = 'cla_right_crouched.gif',	CLA_RIGHT_DEPLOYING = 'cla_right_deploying.gif',
	    CLA_DOWN_CROUCHED = 'cla_down_crouched.gif',	CLA_DOWN_DEPLOYING = 'cla_down_deploying.gif',
	    CLA_LEFT_CROUCHED = 'cla_left_crouched.gif',	CLA_LEFT_DEPLOYING = 'cla_left_deploying.gif';

	var DO_UP_0 = 'do_up_0.gif',			DO_LEFT_0 = 'do_left_0.gif',
	    DO_UP_1 = 'do_up_1.gif',			DO_LEFT_1 = 'do_left_1.gif',
	    DO_UP_3 = 'do_up_3.gif',			DO_LEFT_3 = 'do_left_3.gif',
	    DO_UP_4 = DO_UP_2 = DO_UP_0,		DO_LEFT_4 = DO_LEFT_2 = DO_LEFT_0,
	    DO_DOWN_0 = 'do_down_0.gif',		DO_RIGHT_0 = 'do_right_0.gif',
	    DO_DOWN_1 = 'do_down_1.gif',		DO_RIGHT_1 = 'do_right_1.gif',
	    DO_DOWN_3 = 'do_down_3.gif',		DO_RIGHT_3 = 'do_right_3.gif',
	    DO_DOWN_4 = DO_DOWN_2 = DO_DOWN_0,		DO_RIGHT_4 = DO_RIGHT_2 = DO_RIGHT_0;

	var MATE0_UP_0 = 'mate0_up_0.gif',		MATE0_LEFT_0 = 'mate0_left_0.gif',
	    MATE0_UP_1 = 'mate0_up_1.gif',		MATE0_LEFT_1 = 'mate0_left_1.gif',
	    MATE0_UP_3 = 'mate0_up_3.gif',		MATE0_LEFT_3 = 'mate0_left_3.gif',
	    MATE0_UP_4 = MATE0_UP_2 = MATE0_UP_0,	MATE0_LEFT_4 = MATE0_LEFT_2 = MATE0_LEFT_0,
	    MATE0_DOWN_0 = 'mate0_down_0.gif',		MATE0_RIGHT_0 = 'mate0_right_0.gif',
	    MATE0_DOWN_1 = 'mate0_down_1.gif',		MATE0_RIGHT_1 = 'mate0_right_1.gif',
	    MATE0_DOWN_3 = 'mate0_down_3.gif',		MATE0_RIGHT_3 = 'mate0_right_3.gif',
	    MATE0_DOWN_4 = MATE0_DOWN_2 = MATE0_DOWN_0,	MATE0_RIGHT_4 = MATE0_RIGHT_2 = MATE0_RIGHT_0;

	var MATE1_UP_0 = 'mate1_up_0.gif',		MATE1_LEFT_0 = 'mate1_left_0.gif',
	    MATE1_UP_1 = 'mate1_up_1.gif',		MATE1_LEFT_1 = 'mate1_left_1.gif',
	    MATE1_UP_3 = 'mate1_up_3.gif',		MATE1_LEFT_3 = 'mate1_left_3.gif',
	    MATE1_UP_4 = MATE1_UP_2 = MATE1_UP_0,	MATE1_LEFT_4 = MATE1_LEFT_2 = MATE1_LEFT_0,
	    MATE1_DOWN_0 = 'mate1_down_0.gif',		MATE1_RIGHT_0 = 'mate1_right_0.gif',
	    MATE1_DOWN_1 = 'mate1_down_1.gif',		MATE1_RIGHT_1 = 'mate1_right_1.gif',
	    MATE1_DOWN_3 = 'mate1_down_3.gif',		MATE1_RIGHT_3 = 'mate1_right_3.gif',
	    MATE1_DOWN_4 = MATE1_DOWN_2 = MATE1_DOWN_0,	MATE1_RIGHT_4 = MATE1_RIGHT_2 = MATE1_RIGHT_0;

	var MATE2_UP_0 = 'mate2_up_0.gif',		MATE2_LEFT_0 = 'mate2_left_0.gif',
	    MATE2_UP_1 = 'mate2_up_1.gif',		MATE2_LEFT_1 = 'mate2_left_1.gif',
	    MATE2_UP_3 = 'mate2_up_3.gif',		MATE2_LEFT_3 = 'mate2_left_3.gif',
	    MATE2_UP_4 = MATE2_UP_2 = MATE2_UP_0,	MATE2_LEFT_4 = MATE2_LEFT_2 = MATE2_LEFT_0,
	    MATE2_DOWN_0 = 'mate2_down_0.gif',		MATE2_RIGHT_0 = 'mate2_right_0.gif',
	    MATE2_DOWN_1 = 'mate2_down_1.gif',		MATE2_RIGHT_1 = 'mate2_right_1.gif',
	    MATE2_DOWN_3 = 'mate2_down_3.gif',		MATE2_RIGHT_3 = 'mate2_right_3.gif',
	    MATE2_DOWN_4 = MATE2_DOWN_2 = MATE2_DOWN_0,	MATE2_RIGHT_4 = MATE2_RIGHT_2 = MATE2_RIGHT_0;

	var OUTER_WALL = 'outer_wall.jpg',		INNER_WALL = 'inner_wall.gif',
	    INNER_WALL_BASE = 'inner_wall_base.gif',	DOOR_BASE = 'door_base.gif',
	    GLASS = 'glass.gif';

	var DESK_0 = 'desk_0.gif',	T_DESK = 't_desk.gif',
	    DESK_1 = 'desk_1.gif';

	var MAP = 'map.gif', CAMMEO = 'cammeo.gif';

	var VISUAL_SPACE =
	[ [0, 1, 0], [1, 0, 0], [0, -1, 0], [-1, 0, 0], [1, 1, 0], [1, -1, 0], [-1, 1, 0], [-1, -1, 0],		// gli 8-vicini a terra
	  [0, 2, 1], [2, 0, 1], [0, -2, 1], [-2, 0, 1], [2, 2, 1], [2, -2, 1], [-2, 2, 1], [-2, -2, 1],
	  [1, 2, 1], [-1, 2, 1], [1, -2, 1], [1, -2, 1], [2, 1, 1], [2, -1, 1], [-2, 1, 1], [-2, -1, 1] ];
	 

	/**
	 *	Variables
	 */

	var claudio, dorotea, classMates = new Array(MATES_NUMBER), classMatesLength = 0, classRoom;

	var moveStr = ['UP', 'RIGHT', 'DOWN', 'LEFT'],
	    colors = ['magenta', 'cyan', 'blue', 'lime', 'red'];
