import numpy as np
import pandas as pd
from typing import Callable, Dict, Tuple, Optional, List
from scipy.optimize import minimize_scalar
import warnings

class FiniteDifferenceGreeks:
    def __init__(self, pricing_function: Callable, 
                 base_params: Dict[str, float],
                 tolerance: float = 1e-4,
                 min_step: float = 1e-6,
                 max_step: float = 0.1):
        self.pricing_function = pricing_function
        self.base_params = base_params.copy()
        self.tolerance = tolerance
        self.min_step = min_step
        self.max_step = max_step
    
    def compute_delta(self, S: float, step_size: Optional[float] = None,
                     use_richardson: bool = True) -> Tuple[float, float]:
        if step_size is None:
            step_size = self._adaptive_step_size(S, 'delta')
        
        h = step_size
        V0 = self.pricing_function({**self.base_params, 'S': S})
        
        if use_richardson:
            V_plus_h = self.pricing_function({**self.base_params, 'S': S + h})
            V_minus_h = self.pricing_function({**self.base_params, 'S': S - h})
            delta_h = (V_plus_h - V_minus_h) / (2 * h)
            
            V_plus_h2 = self.pricing_function({**self.base_params, 'S': S + h/2})
            V_minus_h2 = self.pricing_function({**self.base_params, 'S': S - h/2})
            delta_h2 = (V_plus_h2 - V_minus_h2) / h
            
            delta_richardson = (4 * delta_h2 - delta_h) / 3
            error_estimate = abs(delta_richardson - delta_h2)
            
            return delta_richardson, error_estimate
        else:
            V_plus_h = self.pricing_function({**self.base_params, 'S': S + h})
            V_minus_h = self.pricing_function({**self.base_params, 'S': S - h})
            delta = (V_plus_h - V_minus_h) / (2 * h)
            return delta, 0.0
    
    def compute_gamma(self, S: float, step_size: Optional[float] = None,
                     use_richardson: bool = True) -> Tuple[float, float]:
        if step_size is None:
            step_size = self._adaptive_step_size(S, 'gamma')
        
        h = step_size
        V0 = self.pricing_function({**self.base_params, 'S': S})
        
        if use_richardson:
            V_plus_h = self.pricing_function({**self.base_params, 'S': S + h})
            V_minus_h = self.pricing_function({**self.base_params, 'S': S - h})
            gamma_h = (V_plus_h - 2 * V0 + V_minus_h) / (h ** 2)
            
            V_plus_h2 = self.pricing_function({**self.base_params, 'S': S + h/2})
            V_minus_h2 = self.pricing_function({**self.base_params, 'S': S - h/2})
            gamma_h2 = (V_plus_h2 - 2 * V0 + V_minus_h2) / ((h/2) ** 2)
            
            gamma_richardson = (4 * gamma_h2 - gamma_h) / 3
            error_estimate = abs(gamma_richardson - gamma_h2)
            
            return gamma_richardson, error_estimate
        else:
            V_plus_h = self.pricing_function({**self.base_params, 'S': S + h})
            V_minus_h = self.pricing_function({**self.base_params, 'S': S - h})
            gamma = (V_plus_h - 2 * V0 + V_minus_h) / (h ** 2)
            return gamma, 0.0
    
    def compute_theta(self, t: float, step_size: Optional[float] = None,
                     use_richardson: bool = True) -> Tuple[float, float]:
        if step_size is None:
            step_size = self._adaptive_step_size(t, 'theta')
        
        h = step_size
        V0 = self.pricing_function({**self.base_params, 't': t})
        
        if use_richardson:
            V_plus_h = self.pricing_function({**self.base_params, 't': t + h})
            V_minus_h = self.pricing_function({**self.base_params, 't': t - h})
            theta_h = -(V_plus_h - V_minus_h) / (2 * h)
            
            V_plus_h2 = self.pricing_function({**self.base_params, 't': t + h/2})
            V_minus_h2 = self.pricing_function({**self.base_params, 't': t - h/2})
            theta_h2 = -(V_plus_h2 - V_minus_h2) / h
            
            theta_richardson = (4 * theta_h2 - theta_h) / 3
            error_estimate = abs(theta_richardson - theta_h2)
            
            return theta_richardson, error_estimate
        else:
            V_plus_h = self.pricing_function({**self.base_params, 't': t + h})
            theta = -(V_plus_h - V0) / h
            return theta, 0.0
    
    def compute_vega(self, sigma: float, step_size: Optional[float] = None,
                    use_richardson: bool = True) -> Tuple[float, float]:
        if step_size is None:
            step_size = self._adaptive_step_size(sigma, 'vega')
        
        h = step_size
        V0 = self.pricing_function({**self.base_params, 'sigma': sigma})
        
        if use_richardson:
            V_plus_h = self.pricing_function({**self.base_params, 'sigma': sigma + h})
            V_minus_h = self.pricing_function({**self.base_params, 'sigma': sigma - h})
            vega_h = (V_plus_h - V_minus_h) / (2 * h)
            
            V_plus_h2 = self.pricing_function({**self.base_params, 'sigma': sigma + h/2})
            V_minus_h2 = self.pricing_function({**self.base_params, 'sigma': sigma - h/2})
            vega_h2 = (V_plus_h2 - V_minus_h2) / h
            
            vega_richardson = (4 * vega_h2 - vega_h) / 3
            error_estimate = abs(vega_richardson - vega_h2)
            
            return vega_richardson, error_estimate
        else:
            V_plus_h = self.pricing_function({**self.base_params, 'sigma': sigma + h})
            V_minus_h = self.pricing_function({**self.base_params, 'sigma': sigma - h})
            vega = (V_plus_h - V_minus_h) / (2 * h)
            return vega, 0.0
    
    def compute_rho(self, r: float, step_size: Optional[float] = None,
                   use_richardson: bool = True) -> Tuple[float, float]:
        if step_size is None:
            step_size = self._adaptive_step_size(r, 'rho')
        
        h = step_size
        V0 = self.pricing_function({**self.base_params, 'r': r})
        
        if use_richardson:
            V_plus_h = self.pricing_function({**self.base_params, 'r': r + h})
            V_minus_h = self.pricing_function({**self.base_params, 'r': r - h})
            rho_h = (V_plus_h - V_minus_h) / (2 * h)
            
            V_plus_h2 = self.pricing_function({**self.base_params, 'r': r + h/2})
            V_minus_h2 = self.pricing_function({**self.base_params, 'r': r - h/2})
            rho_h2 = (V_plus_h2 - V_minus_h2) / h
            
            rho_richardson = (4 * rho_h2 - rho_h) / 3
            error_estimate = abs(rho_richardson - rho_h2)
            
            return rho_richardson, error_estimate
        else:
            V_plus_h = self.pricing_function({**self.base_params, 'r': r + h})
            V_minus_h = self.pricing_function({**self.base_params, 'r': r - h})
            rho = (V_plus_h - V_minus_h) / (2 * h)
            return rho, 0.0
    
    def compute_all_greeks(self, S: float, t: float, sigma: float, r: float,
                          use_richardson: bool = True) -> Dict[str, Tuple[float, float]]:
        delta, delta_err = self.compute_delta(S, use_richardson=use_richardson)
        gamma, gamma_err = self.compute_gamma(S, use_richardson=use_richardson)
        theta, theta_err = self.compute_theta(t, use_richardson=use_richardson)
        vega, vega_err = self.compute_vega(sigma, use_richardson=use_richardson)
        rho, rho_err = self.compute_rho(r, use_richardson=use_richardson)
        
        return {
            'Delta': (delta, delta_err),
            'Gamma': (gamma, gamma_err),
            'Theta': (theta, theta_err),
            'Vega': (vega, vega_err),
            'Rho': (rho, rho_err)
        }
    
    def _adaptive_step_size(self, param_value: float, greek_type: str) -> float:
        if abs(param_value) < 1e-10:
            return self.max_step
        
        initial_step = 0.01 * abs(param_value)
        initial_step = np.clip(initial_step, self.min_step, self.max_step)
        
        h = initial_step
        max_iterations = 10
        
        for _ in range(max_iterations):
            try:
                if greek_type == 'delta':
                    V_h = self.pricing_function({**self.base_params, 'S': param_value + h})
                    V_mh = self.pricing_function({**self.base_params, 'S': param_value - h})
                    g_h = (V_h - V_mh) / (2 * h)
                    V_h2 = self.pricing_function({**self.base_params, 'S': param_value + h/2})
                    V_mh2 = self.pricing_function({**self.base_params, 'S': param_value - h/2})
                    g_h2 = (V_h2 - V_mh2) / h
                elif greek_type == 'gamma':
                    V0 = self.pricing_function({**self.base_params, 'S': param_value})
                    V_h = self.pricing_function({**self.base_params, 'S': param_value + h})
                    V_mh = self.pricing_function({**self.base_params, 'S': param_value - h})
                    g_h = (V_h - 2 * V0 + V_mh) / (h ** 2)
                    V_h2 = self.pricing_function({**self.base_params, 'S': param_value + h/2})
                    V_mh2 = self.pricing_function({**self.base_params, 'S': param_value - h/2})
                    g_h2 = (V_h2 - 2 * V0 + V_mh2) / ((h/2) ** 2)
                else:
                    return initial_step
                
                error_estimate = abs(g_h - g_h2)
                
                if error_estimate < self.tolerance:
                    break
                
                if error_estimate > 10 * self.tolerance:
                    h = h / 2
                else:
                    h = h * 0.8
            except:
                return initial_step
        
        return np.clip(h, self.min_step, self.max_step)
    
    def compute_greeks_from_grid(self, price_grid: np.ndarray,
                                 S_grid: np.ndarray, t_grid: Optional[np.ndarray] = None,
                                 use_richardson: bool = True) -> Dict[str, np.ndarray]:
        n = len(S_grid)
        delta_grid = np.zeros(n)
        gamma_grid = np.zeros(n)
        
        for i in range(1, n - 1):
            h = S_grid[i + 1] - S_grid[i]
            h_prev = S_grid[i] - S_grid[i - 1]
            
            if use_richardson and i > 1 and i < n - 2:
                delta_fine = (price_grid[i + 1] - price_grid[i - 1]) / (h + h_prev)
                delta_coarse = (price_grid[i + 2] - price_grid[i - 2]) / (2 * (h + h_prev))
                delta_grid[i] = (4 * delta_fine - delta_coarse) / 3
            else:
                delta_grid[i] = (price_grid[i + 1] - price_grid[i - 1]) / (h + h_prev)
            
            if use_richardson and i > 1 and i < n - 2:
                gamma_fine = (price_grid[i + 1] - 2 * price_grid[i] + price_grid[i - 1]) / (h ** 2)
                gamma_coarse = (price_grid[i + 2] - 2 * price_grid[i] + price_grid[i - 2]) / ((2 * h) ** 2)
                gamma_grid[i] = (4 * gamma_fine - gamma_coarse) / 3
            else:
                gamma_grid[i] = (price_grid[i + 1] - 2 * price_grid[i] + price_grid[i - 1]) / (h ** 2)
        
        result = {'Delta': delta_grid, 'Gamma': gamma_grid}
        
        if t_grid is not None and len(t_grid) > 1:
            theta_grid = np.zeros(n)
            dt = t_grid[1] - t_grid[0] if len(t_grid) > 1 else 1.0
            for i in range(n):
                if i < len(price_grid) - 1:
                    theta_grid[i] = -(price_grid[i + 1] - price_grid[i]) / dt
            result['Theta'] = theta_grid
        
        return result
